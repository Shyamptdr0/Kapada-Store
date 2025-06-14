import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import ShoppingOrdersDetailsView from "@/components/shopping-view/OrdersDetails.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrderUser, getOrdersDetails, resetOrdersDetails} from "@/store/shop/order-slice/index.js";
import {Badge} from "@/components/ui/badge.jsx";

function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    const {orderList, orderDetails} = useSelector(state => state.shopOrder)

    function handleFetchOrderDetails(getId){
        dispatch(getOrdersDetails(getId))
    }

    useEffect(() => {
        dispatch(getAllOrderUser(user?.id))
    }, [dispatch]);

    useEffect(() => {

        if(orderDetails !== null){
            setOpenDetailsDialog(true)
        }
    }, [orderDetails]);


    return (
       <Card>
           <CardHeader>
               <CardTitle>Order History</CardTitle>
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
                               orderList.map(orderItem=>
                                   <TableRow>
                                       <TableCell>{orderItem?._id}</TableCell>
                                       <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                       <TableCell>
                                           <Badge className={` py-1 px-3 ${
                                               orderItem?.orderStatus === 'confirmed'
                                               ? 'bg-green-500'
                                               : orderItem?.orderStatus === 'rejected'
                                                   ? "bg-red-600"
                                                   : "bg-black"}`}>
                                               {orderItem?.orderStatus}
                                           </Badge>
                                       </TableCell>
                                       <TableCell>${orderItem?.totalAmount}</TableCell>
                                       <TableCell>
                                           <Dialog open={openDetailsDialog} onOpenChange={()=>{
                                               setOpenDetailsDialog(false)
                                               dispatch(resetOrdersDetails())
                                           }}>
                                               <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                                               View Details
                                               </Button>
                                               <ShoppingOrdersDetailsView orderDetails={orderDetails}/>
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

export default ShoppingOrders;