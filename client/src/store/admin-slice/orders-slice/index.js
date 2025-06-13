import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    orderList: [],
    orderDetails : null,
}

export const getAllOrderForAdmin = createAsyncThunk('/order/getAllOrderForAdmin',
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get/`
        );

        return response.data;
    })

export const getOrdersDetailsForAdmin = createAsyncThunk('/order/getOrdersDetails',
    async(id)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
        );

        return response.data;
    })

export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus',
    async({id, orderStatus})=>{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,{ orderStatus}
        );

        return response.data;
    })


const adminOrderSlice = createSlice({
    name : 'adminOrderSlice',
    initialState,
    reducers : {
        resetOrdersDetails :(state) =>{
            state.orderDetails = null
        }
    },
    extraReducers: builder => {

        builder.addCase(getAllOrderForAdmin.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getAllOrderForAdmin.fulfilled, (state,action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrderForAdmin.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrdersDetailsForAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrdersDetailsForAdmin.fulfilled, (state,action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrdersDetailsForAdmin.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
    }
})
export const {resetOrdersDetails} = adminOrderSlice.actions
export default adminOrderSlice.reducer