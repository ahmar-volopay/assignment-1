import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
    name: 'chart',
    initialState: {
        loading: false,
        annualReports: [],
        error: null,
        symbol: null
    },
    reducers: {
        fetchChartRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchChartSuccess: (state, action) => {
            state.loading = false;
            state.annualReports = action.payload.annualReports;
            state.symbol = action.payload.symbol;
        },
        fetchChartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; 
        }
    }
});

export const { fetchChartRequest, fetchChartSuccess, fetchChartFailure } = chartSlice.actions;
export default chartSlice.reducer;
