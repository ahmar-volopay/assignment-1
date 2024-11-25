import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        error: null,
        products: [], // Store all the fetched products
    },
    reducers: {
        fetchProductRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductSuccess: (state, action) => {
            state.loading = false;
            state.products = [...state.products, ...action.payload.products]; // Append new products
        },
        fetchProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProductRequest, fetchProductSuccess, fetchProductFailure } =
    productSlice.actions;

export default productSlice.reducer;


