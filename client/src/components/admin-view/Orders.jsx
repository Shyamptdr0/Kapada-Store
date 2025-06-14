import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import AdminOrdersDetailsView from "@/components/admin-view/OrdersDetails.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteOrderById,
    getAllOrderForAdmin,
    getOrdersDetailsForAdmin
} from "@/store/admin-slice/orders-slice/index.js";
import {Badge} from "@/components/ui/badge.jsx";
import {resetOrdersDetails} from "@/store/admin-slice/orders-slice";

function AdminOrdersView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const {orderList, orderDetails} = useSelector(state => state.adminOrders)
    const dispatch = useDispatch()

    function handleFetchOrderDetails(getId) {
        dispatch(getOrdersDetailsForAdmin(getId))
    }

    console.log(orderDetails)

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [orderDetails]);

    useEffect(() => {
        dispatch(getAllOrderForAdmin())
    }, [dispatch]);

    console.log(orderList, "orderList")

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                orderList.map(orderItem =>
                                    <TableRow>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={` py-1 px-3 ${orderItem?.orderStatus === 'confirmed'
                                                    ? 'bg-green-500'
                                                    : orderItem?.orderStatus === 'rejected'
                                                        ? "bg-red-600"
                                                        : "bg-black"}`}>
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>${orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog
                                                open={openDetailsDialog} onOpenChange={() => {
                                                setOpenDetailsDialog(false)
                                                dispatch(resetOrdersDetails())
                                            }}
                                            >
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        className="bg-blue-600 text-white"
                                                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                                                    >
                                                        View Details
                                                    </Button>

                                                    <Button
                                                        className="bg-red-600 text-white"
                                                        onClick={() => dispatch(deleteOrderById(orderItem?._id))}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                                <AdminOrdersDetailsView orderDetails={orderDetails}/>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>)
                                : null
                        }

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default AdminOrdersView;