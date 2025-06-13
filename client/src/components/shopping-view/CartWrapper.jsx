import React from 'react';
import {SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import UserCartItemsContent from "@/components/shopping-view/CartItemsContent.jsx";
import {useNavigate} from "react-router-dom";

function  UserCartWrapper({cartItems, setOpenCartSheet}) {

    const navigate = useNavigate()

    const totalCartAmount = cartItems && cartItems.length > 0  ?
        cartItems.reduce((sum,currentItem)=> sum +(
            currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
        ) * currentItem?.quantity , 0 ): 0;

    return (
        <SheetContent className="sm:max-w-md ">
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ?
                    cartItems.map(item=> <UserCartItemsContent cartItem={item}/>) : null
                }
            </div>
            <div className="m-6">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <div className="m-5">
                <Button onClick={()=> {
                    navigate("/shop/checkout")
                    setOpenCartSheet(false)
                }} className="w-full ">
                    CheckOut
                </Button>
            </div>
        </SheetContent>
    );
}

export default UserCartWrapper;