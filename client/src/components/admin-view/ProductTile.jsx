import React from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";

function AdminProductTile({ product, setFormData,setOpenCreateProductDialog,setCurrentEditedId,handleDelete}) {

    console.log(product, 'prooooo')
    return (
        <>
        <Card className='w-full max-w-sm mx-auto'>
           <div>
               <div className='relative'>
                   <img
                   src={product.image}
                   alt={product.title}
                   className='w-full h-[300px] object-cover rounded-t-lg'
                   />
                   {
                       product?.totalStock <= 0 ?
                           <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                               Out of Stock
                           </Badge>
                           :
                           product?.totalStock <10 ?
                               <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                   {`Only ${product?.totalStock} items left`}
                               </Badge>
                               :
                               product?.salePrice > 0 ?
                                   <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                       Sale
                                   </Badge> : null
                   }
               </div>
               <CardContent>
                   <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
                   <h3>Quantity {product?.totalStock}</h3>
                   <div  className='flex justify-between items-center mb-2'>
                       <span>{product?.category}</span>
                       <span>{product?.brand}</span>

                   </div>
                   <div  className='flex justify-between items-center mb-2'>
                       <span className={`${
                               product?.salePrice > 0 ? "line-through" : ""
                           } text-lg font-semibold text-primary`}
                         >
                           ${product?.price}
                        </span>
                       {product?.salePrice > 0 ? (
                           <span className="text-lg font-bold">${product?.salePrice}</span>
                       ) : null}

                   </div>
               </CardContent>
               <CardFooter className='flex justify-between items-center'>
                   <Button onClick={() => {
                       setOpenCreateProductDialog(true);
                       setCurrentEditedId(product?._id);
                       setFormData(product);

                   }}>
                       Edit
                   </Button>

                   <Button
                       onClick={()=>handleDelete(product?._id)}
                   >Delete
                   </Button>
               </CardFooter>
           </div>
        </Card>
        </>
    );
}

export default AdminProductTile;