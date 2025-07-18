import React, {useEffect, useState} from 'react';
import ProductCategoryFilter from "@/components/shopping-view/Filter.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDownIcon} from "lucide-react";
import {sortOptions} from "@/config/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllFilteredProducts, fetchProductDetails} from "@/store/shop/products-slice/index.js";
import ShoppingProductTile from "@/components/shopping-view/ProductTile.jsx";
import {createSearchParams, useSearchParams} from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails.jsx";
import {addToCart, fetchCartItems} from "@/store/shop/cart-slice/index.js";
import {toast} from "sonner";


function createSearchParamsHelper(filerParams){
    const queryParams = [];

    for (const [key, value] of Object.entries(filerParams)){
        if (Array.isArray(value) && value.length > 0 ){
            const paramValue = value.join(',')

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    console.log(queryParams, "queryParams");
  return queryParams.join("&")
}


function ShoppingListing() {

    const dispatch = useDispatch();
    const {productList, productDetails} = useSelector((state) => state.shopProducts);
    const {cartItems} = useSelector(state => state.shopCart)
    const {user} =useSelector(state => state.auth)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams,setSearchParams] = useSearchParams()
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const categorySearchParams = searchParams.get('category')

    function handleSort(value){
        setSort(value)
    }

    function handleFilter(getSectionId, getCurrentOption){

        let cpyFilters = {...filters};
        const indexOfCurrentSection =Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]:[getCurrentOption],
            }
        }else {
            const indexOfCurrentSection = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexOfCurrentSection === -1){
                cpyFilters[getSectionId].push(getCurrentOption);
            }
            else {
                cpyFilters[getSectionId].splice(indexOfCurrentSection, 1);
            }
        }

        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }


    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))

    }

    function handleAddToCart(getCurrentProductId , getTotalStock){
        let getCartItems = cartItems.items || []
        if (getCartItems){
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId )

            if (indexOfCurrentItem > -1){
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock){
                    toast.error(  `Only ${getQuantity} quantity can be added for this item` )
                    return;
                }
            }
        }
        dispatch(addToCart({userId:user?.id ,
            productId: getCurrentProductId,
            quantity:1}))
            .then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id))
                toast.success("Product is added to cart")
            }}
            )
    }


    useEffect(() => {
        setSort("price-lowtohigh")
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [categorySearchParams]);


    useEffect(() => {
      if (filters && Object.keys(filters).length > 0){
          const createQueryString = createSearchParamsHelper(filters)
          setSearchParams(new URLSearchParams(createQueryString))
      }
    }, [filters]);

   useEffect(() => {
       if (filters !== null && sort !== null)
       dispatch(fetchAllFilteredProducts({filterParams : filters, sortParams : sort}))
   },[dispatch, sort, filters]);


    useEffect(() => {
        if (productDetails !== null)setOpenDetailsDialog(true)
    }, [productDetails]);


    console.log(productList, "productlist")
    return (
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 mt-16'>
         <ProductCategoryFilter filters={filters} handleFilter={handleFilter} />
            <div className='bg-background w-full rounded-lg shadow-sm'>
                <div className='p-4 border-b flex items-center justify-between'>
                    <h2 className='text-lg font-extrabold '>All products</h2>
                    <div className='flex items-center gap-3'>
                       <span className='text-muted-foreground'>{productList?.length} products</span>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='sm' className='flex items-center gap-1'>
                                <ArrowUpDownIcon className='h-4 w-4'/>
                                <span>Sort by</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[200px]'>
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                {
                                    sortOptions.map(sortItem=>
                                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {
                                                sortItem.label
                                            }
                                        </DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4'>
                    {
                        productList && productList.length > 0 ? productList.map((productItem) => (
                            <ShoppingProductTile
                                product={productItem}
                                handleGetProductDetails={handleGetProductDetails}
                                handleAddToCart={handleAddToCart}
                            />
                        )):null
                    }
                </div>
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingListing;