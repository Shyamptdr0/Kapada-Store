import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    approvalURL : null,
    isLoading : false,
    orderId : null,
    orderList : [],
    orderDetails : null,
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder',
    async(orderData)=>{
    const response = await axios.post("http://localhost:5000/api/shop/order/create" , orderData);

    return response.data;
})

export const capturePayment = createAsyncThunk('/order/capturePayment',
    async({paymentId, payerId, orderId})=>{
    const response = await axios.post("http://localhost:5000/api/shop/order/capture" ,
        {
        paymentId, payerId, orderId
        }
    );

    return response.data;
})

export const getAllOrderUser = createAsyncThunk('/order/getAllOrderUser',
    async(userId)=>{
        const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`
        );

        return response.data;
    })

export const getOrdersDetails = createAsyncThunk('/order/getOrdersDetails',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`
        );

        return response.data;
    })

const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {
        resetOrdersDetails :(state) =>{
           state.orderDetails = null
        }
    },
    extraReducers: (builder) =>{
      builder.addCase(createNewOrder.pending, (state) => {
          state.isLoading = true;
      })
          .addCase(createNewOrder.fulfilled, (state,action) => {
              state.isLoading = false;
              state.approvalURL = action.payload.approvalURL;
              state.orderId = action.payload.orderId;
              sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
          })
          .addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
          })
          .addCase(getAllOrderUser.pending, (state) => {
          state.isLoading = true;
          })
          .addCase(getAllOrderUser.fulfilled, (state,action) => {
          state.isLoading = false;
          state.orderList = action.payload.data;
          })
          .addCase(getAllOrderUser.rejected, (state) => {
          state.isLoading = false;
          state.orderList = [];
          })
          .addCase(getOrdersDetails.pending, (state) => {
          state.isLoading = true;
          })
          .addCase(getOrdersDetails.fulfilled, (state,action) => {
          state.isLoading = false;
          state.orderDetails = action.payload.data;
         })
          .addCase(getOrdersDetails.rejected, (state) => {
          state.isLoading = false;
          state.orderDetails = null;
          })
    }
})


export const {resetOrdersDetails} = shoppingOrderSlice.actions
export default shoppingOrderSlice.reducer