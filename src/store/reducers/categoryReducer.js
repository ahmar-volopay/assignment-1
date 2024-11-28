import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false, 
    error: null,    
    categories: [], 
  },
  reducers: {
    fetchCategoryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    fetchCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
  },
});

export const { fetchCategoryRequest, fetchCategorySuccess, fetchCategoryFailure } =
  categorySlice.actions;

export default categorySlice.reducer;
