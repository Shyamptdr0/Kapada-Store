import React, { useState } from 'react';
import { DialogContent } from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import CommonForm from "@/components/common/Form.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrderForAdmin,
    getOrdersDetailsForAdmin,
    updateOrderStatus
} from "@/store/admin-slice/orders-slice/index.js";
import { toast } from 'sonner';

const initialFormData = {
    status: ''
};

// Utility function to format date and time
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

function AdminOrdersDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();



    function handleUpdateStatus(event) {
        event.preventDefault();
        const { status } = formData;

        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrdersDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrderForAdmin());
                setFormData(initialFormData);
                toast.success(data?.payload?.message);
            }
        });
    }

    return (
        <DialogContent className="max-h-[90vh] w-full sm:max-w-3xl p-4 sm:p-6 overflow-y-auto rounded-xl">
            <div className="grid gap-6">
                <div>
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
                                <Badge
                                    className={`py-1 px-3 ${
                                        orderDetails?.orderStatus === 'confirmed'
                                            ? 'bg-green-500'
                                            : orderDetails?.orderStatus === 'rejected'
                                                ? "bg-red-600"
                                                : "bg-black"
                                    }`}
                                >
                                    {orderDetails?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div className="grid mb-3 mt-6 gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Order Details</div>
                            <ul className="grid gap-3">
                                {orderDetails?.cartItems?.length > 0 &&
                                    orderDetails.cartItems.map((item, index) => (
                                        <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between">
                                            <span>Title: {item.title}</span>
                                            <span>Quantity: {item.quantity}</span>
                                            <span>Price: ${item.price}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    <Separator />

                    {/* Shipping Info */}
                    <div className="grid mt-6 gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>User Name: {orderDetails?.userId?.userName}</span>
                                <span>User Email: {orderDetails?.userId?.email}</span>
                                <span>Address: {orderDetails?.addressInfo?.address}</span>
                                <span>City: {orderDetails?.addressInfo?.city}</span>
                                <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
                                <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                                <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update Order Status Form */}
                <div className="mt-3">
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    );
}

export default AdminOrdersDetailsView;
