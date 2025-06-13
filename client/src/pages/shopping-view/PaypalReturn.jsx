import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice/index.js";

function PaypalReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = sessionStorage.getItem("currentOrderId");

            if (orderId) {
                dispatch(capturePayment({ paymentId, payerId, orderId: JSON.parse(orderId) }))
                    .then((data) => {
                        if (data?.payload?.success) {
                            sessionStorage.removeItem("currentOrderId");
                            window.location.href = "/shop/payment-success";
                        } else {
                            console.error("Payment capture failed", data?.payload);
                        }
                    });
            } else {
                console.warn("No orderId found in sessionStorage.");
            }
        }
    }, [paymentId, payerId, dispatch]);

    return (
        <div className="m-5 flex items-center justify-center h-screen">
            <Card className="p-10 text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                        Processing Payment... <br/>
                        Please wait!
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
}

export default PaypalReturnPage;
