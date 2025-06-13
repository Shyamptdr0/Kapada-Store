import React from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Button} from "@/components/ui/button.jsx";
import {brandOptionsMap, categoryOptionsMap} from "@/config/index.jsx";

function ShoppingProductTile({product,handleGetProductDetails,handleAddToCart}) {

    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div onClick={()=>handleGetProductDetails(product?._id)}>
                <div className='relative'>
                    <img
                    src={product.image}
                    alt={product.title}
                    className='w-full h-[300px] object-cover rounded-t-lg '/>
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
                <CardContent className='p-4 '>
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-xl text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
                        <span className='text-lg text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={` text-lg font-semibold text-primary ${product?.salePrice > 0 ? 'line-through' : ''}`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ?
                                <span className='text-lg font-semibold text-primary'>${product?.salePrice}</span>
                                : null
                        }

                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {
                    product?.totalStock <= 0 ?
                        <Button className='w-full opacity-60 cursor-not-allowed'>Out of Stock</Button>
                        :
                        <Button onClick={()=>handleAddToCart(product?._id, product?.totalStock)} className='w-full'>Add to cart</Button>
                }

            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;