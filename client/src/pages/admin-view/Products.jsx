import React, {Fragment, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.jsx";
import CommonForm from "@/components/common/Form.jsx";
import {addProductFormElements} from "@/config/index.jsx";
import ProductImageUpload from "@/components/admin-view/ImageUpload.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addNewProduct, deleteProduct, editProduct, fetchAllProducts} from "@/store/admin-slice/products-slice/index.js";
import {toast} from "sonner";
import AdminProductTile from "@/components/admin-view/ProductTile.jsx";

const initialFormData= {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: "",
    salePrice: '',
    totalStock: '',
}

function AdminProducts(props) {



    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const[formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId , setCurrentEditedId] = useState(null)
    const {productList}= useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();

    console.log(formData)
    function onSubmit(event){
       event.preventDefault();

       currentEditedId !== null ?
           dispatch(editProduct({
               id: currentEditedId,
               formData
           })).then((data)=>{
               console.log(data, 'edit product')
               if (data?.payload?.success) {
                   dispatch(fetchAllProducts());
                   setFormData(initialFormData)
                   setOpenCreateProductDialog(false)
                   setCurrentEditedId(null)
               }
           }) :
       dispatch(addNewProduct({
           ...formData,
           image: uploadedImageUrl,
       })
       ).then((data)=>{
           console.log(data)
           if(data?.payload?.success){
               dispatch(fetchAllProducts())
               setOpenCreateProductDialog(false)
               setImageFile(null);
               setFormData(initialFormData)
               toast.success("Product added successfully");

           }
       })
    }

    function handleDelete(getCurrentProductId){

        dispatch(deleteProduct(getCurrentProductId)).then(data=>{
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());

            }
        })
    }

    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key] !== '').every(item=> item)
    }


    useEffect(() => {
      dispatch(fetchAllProducts())
    },[dispatch])

    console.log(productList,'productList')
    return (
        <Fragment>
           <div className=' mb-5 w-full flex justify-end'>
               <Button onClick={()=> setOpenCreateProductDialog(true)}>
                   Add New Product
               </Button>
           </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {
                    productList && productList.length > 0 ?
                        productList.map((productItem) =>
                            <AdminProductTile
                                setFormData={setFormData}
                                setOpenCreateProductDialog={setOpenCreateProductDialog}
                                setCurrentEditedId={setCurrentEditedId}
                                product={productItem}
                                handleDelete={handleDelete}

                            />)  : null
                }
            </div>

            <Sheet open={openCreateProductDialog} onOpenChange={()=>{
                setOpenCreateProductDialog(false);
                setCurrentEditedId(null)
                setFormData(initialFormData)

            }}>
                <SheetContent side='right' className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle className='mt-5 font-bold text-lg'>
                            {
                                currentEditedId !== null ?
                                    'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="p-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !==null ? 'Edit' : 'Add'}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;