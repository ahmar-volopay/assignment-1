import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stocks',
    initialState: {
        loading: false,
        metadata: null,
        top_gainers: [],
        top_losers: [],
        error: null,
    },
    reducers: {
        fetchStocksRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStocksSuccess: (state, action) => {
            state.loading = false;
            state.metadata = action.payload.metadata;
            state.top_gainers = action.payload.top_gainers;
            state.top_losers = action.payload.top_losers;
        },
        fetchStocksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStocksRequest, fetchStocksSuccess, fetchStocksFailure } = stockSlice.actions;

export default stockSlice.reducer;
