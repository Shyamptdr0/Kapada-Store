import React, {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input.jsx";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResults, resetSearchResults} from "@/store/shop/search-slice/index.js";
import ShoppingProductTile from "@/components/shopping-view/ProductTile.jsx";
import {toast} from "sonner";
import {addToCart, fetchCartItems} from "@/store/shop/cart-slice/index.js";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails.jsx";
import {fetchProductDetails} from "@/store/shop/products-slice/index.js";

function SearchProducts() {

    const [keyword, setKeyword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const {searchResults} = useSelector(state => state.shopSearch)
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.shopCart)
    const {user} = useSelector(state => state.auth)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const { productDetails} = useSelector((state) => state.shopProducts);

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword]);

    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || []
        if (getCartItems) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)

            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast.error(`Only ${getQuantity} quantity can be added for this item`)
                    return;
                }
            }
        }
        dispatch(addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1
        }))
            .then((data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchCartItems(user?.id))
                        toast.success("Product is added to cart")
                    }
                }
            )
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))

    }
    useEffect(() => {
        if (productDetails !== null)setOpenDetailsDialog(true)
    }, [productDetails]);

    console.log(searchResults, 'search')
    return (
        <div className="mt-15">
            <div className="containe mx-auto md:px-6 px-4 py-8">
                <div className="flex justify-center mb-8 ">
                    <div className="w-full flex items-center">
                        <Input
                            value={keyword}
                            name={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            className="py-6"
                            placeholder="Search Products..."
                        />
                    </div>
                </div>
                {
                    !searchResults.length ? <h1 className="text-5xl font-extrabold">No result found</h1> : null
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        searchResults.map(item => <ShoppingProductTile
                            handleAddToCart={handleAddToCart}
                            product={item}
                            handleGetProductDetails={handleGetProductDetails}
                        />)
                    }
                </div>
                <ProductDetailsDialog
                    open={openDetailsDialog}
                    setOpen={setOpenDetailsDialog}
                    productDetails={productDetails}
                />
            </div>
        </div>
    );
}

export default SearchProducts;