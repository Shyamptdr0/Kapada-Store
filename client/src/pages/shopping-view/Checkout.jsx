import React, {useState} from 'react';
import img from "../../assets/account.jpg"
import Address from "@/components/shopping-view/Address.jsx";
import {useDispatch, useSelector} from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/CartItemsContent.jsx";
import {Button} from "@/components/ui/button.jsx";
import {createNewOrder} from "@/store/shop/order-slice/index.js";
import {toast} from "sonner";

function ShoppingCheckout() {

    const {cartItems} = useSelector((state) => state.shopCart)
    const {user} = useSelector(state => state.auth)
    const { approvalURL } = useSelector((state) => state.shopOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
    const dispatch = useDispatch()
    const [isPaymentStart, setIsPaymentStart] = useState(false);


    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0  ?
        cartItems.items.reduce((sum,currentItem)=> sum +(
            currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
        ) * currentItem?.quantity , 0 ): 0;

    function handleInitiatePaypalPayment(){
        if (cartItems.length === 0){
            toast.error("Your cart is empty. Please add items to your cart")
            return;
        }

        if (currentSelectedAddress === null){
            toast.error("Please select one address to proceed")
            return;
        }

        const orderData = {

            userId : user?.id,
            cartId : cartItems?._id,
            cartItems: cartItems.items.map(singleCartItem => ({
                productId : singleCartItem?.productId,
                title : singleCartItem?.title,
                image : singleCartItem?.image,
                price : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
                quantity : singleCartItem?.quantity,
            })),
            addressInfo : {
                addressId : currentSelectedAddress?._id,
                address : currentSelectedAddress?.address ,
                city : currentSelectedAddress?.city,
                pincode : currentSelectedAddress?.pincode,
                phone : currentSelectedAddress?.phone,
                notes :currentSelectedAddress?.notes,
            },
            orderStatus : 'pending',
            paymentMethod : 'paypal' ,
            paymentStatus : 'pending' ,
            totalAmount : totalCartAmount ,
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : "",
            payerId : "",
        }

        dispatch(createNewOrder(orderData)).then((data)=>{
            console.log(data, 'shyam')
            if (data?.payload?.success){
                 setIsPaymentStart(true)
            }else {
                setIsPaymentStart(false)
            }
        })
    }
    if (approvalURL) {
        window.location.href = approvalURL;
    }




    return (
        <div className="mt-15 flex flex-col ">
         <div className="relative h-[300px] w-full overflow-hidden">
              <img
                  src={img}
                  alt="img"
                  className="h-full w-full object-cover object-center"
              />
         </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
              <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>
                <div className="flex flex-col gap-4">
                    {
                        cartItems && cartItems.items &&  cartItems.items.length > 0 ?
                            cartItems.items.map(item=> <UserCartItemsContent cartItem={item}/>)
                            : null
                    }
                    <div className="m-6">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">${totalCartAmount}</span>
                        </div>
                    </div>
                    <div className="m-2">
                        <Button onClick={handleInitiatePaypalPayment} className="mt-4 w-full">
                            {
                                isPaymentStart ? 'Processing Payment...' : 'Checkout with Payment'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;