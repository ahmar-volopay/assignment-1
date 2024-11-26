import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    products: [], 
  },
  reducers: {
    fetchProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      // Check if the Replace Flag is true
      if (action.payload.replace) {
        state.products = action.payload.products; // Replace the products
      } else {
        state.products = [...state.products, ...action.payload.products]; //Else Append to the existing products
      }
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductRequest, fetchProductSuccess, fetchProductFailure } = productSlice.actions;

export default productSlice.reducer;
