import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: [],
};

export const addFeatureImages = createAsyncThunk(
    "/addresses/addFeatureImages",
    async (image) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/common/feature/add`,{
                image
            }

        );

        return response.data;
    }
);

export const getFeatureImages = createAsyncThunk(
    "/addresses/getFeatureImages",
    async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/common/feature/get`
        );

        return response.data;
    }
);

export const deleteFeatureImage = createAsyncThunk(
    "/addresses/deleteFeatureImage",
    async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/common/feature/delete/${id}`);
        return response.data;
    }
);


const commonSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = []
            })

    },
});

export default commonSlice.reducer;