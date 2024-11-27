import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    products: [], 
    total: null, // Total number of products
  },
  reducers: {
    fetchProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;

      // Log action payload for debugging
      console.log("Payload received in fetchProductSuccess:", action.payload);

      // Check if the Replace Flag is true
      if (action.payload.replace) {
        state.products = action.payload.products; // Replace the products
      } else {
        state.products = [...state.products, ...action.payload.products]; // Append to the existing products
      }

      // Update the total value
      state.total = action.payload.total; // Use state to store the total
      console.log("Updated state.total:", state.total);
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
