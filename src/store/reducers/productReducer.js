import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    products: [], 
    total: null, 
  },
  reducers: {
    fetchProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;


      if (action.payload.replace) {
        state.products = action.payload.products; 
      } else {
        state.products = [...state.products, ...action.payload.products]; 
      }

      state.total = action.payload.total; 
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
