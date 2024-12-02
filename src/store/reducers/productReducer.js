import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    fetchLoading: false,
    fetchError: null,
    products: [],
    total: null,
    updateLoading: false,
    updateSuccess: false,
    updateError: null,
  },
  reducers: {
    fetchProductRequest: (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchProductSuccess: (state, action) => {
      state.fetchLoading = false;

      if (action.payload.replace) {
        state.products = action.payload.products;
      } else {
        state.products = [...state.products, ...action.payload.products];
      }

      state.total = action.payload.total;
    },
    fetchProductFailure: (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
    updateProductRequest: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updateProductSuccess: (state, action) => {
      state.updateLoading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? { ...product, ...action.payload } : product
      );
      state.updateSuccess = true;
    },
    updateProductFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
  },
});

export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
