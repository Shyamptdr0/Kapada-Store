import React from 'react';
import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { DialogContent } from "@/components/ui/dialog.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useSelector } from "react-redux";

// Utility function to format date + time
function formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

function ShoppingOrdersDetailsView({ orderDetails }) {
    const { user } = useSelector(state => state.auth);

    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order Id</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date & Time</p>
                        <Label>{formatDateTime(orderDetails?.orderDate)}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 mb-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`py-1 px-3 ${
                                orderDetails?.orderStatus === 'confirmed'
                                    ? 'bg-green-500'
                                    : orderDetails?.orderStatus === 'rejected'
                                        ? 'bg-red-600'
                                        : 'bg-black'
                            }`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>

                <Separator />

                <div className="grid mt-6 gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems?.length > 0 &&
                                orderDetails.cartItems.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="grid mt-6 gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>UserName: {user?.userName}</span>
                            <span>Address: {orderDetails?.addressInfo?.address}</span>
                            <span>City: {orderDetails?.addressInfo?.city}</span>
                            <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
                            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default ShoppingOrdersDetailsView;
