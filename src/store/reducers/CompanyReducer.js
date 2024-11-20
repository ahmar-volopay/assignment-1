import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        loading: false,
        desc: null,
        address: null,
        currency: null,
        exchange: null,
        sector: null,
        website: null,
        profitMargin: null,
        WeekHigh52: null,
        WeekLow52: null,
        eps: null,
        error: null,
    },
    reducers: {
        fetchCompanyRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCompanySuccess: (state, action) => {
            state.loading = false;
            state.desc = action.payload.Description;
            state.address = action.payload.Address;                        
            state.currency = action.payload.Currency;                    
            state.exchange = action.payload.Exchange;                    
            state.sector = action.payload.Sector;                    
            state.website = action.payload.OfficialSite;                    
            state.profitMargin = action.payload.ProfitMargin;                    
            state.WeekHigh52 = action.payload["52WeekHigh"];                    
            state.WeekLow52 = action.payload["52WeekLow"];                    
            state.eps = action.payload.EPS;                        
        },
        fetchCompanyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchCompanyRequest, fetchCompanySuccess, fetchCompanyFailure } = companySlice.actions;
export default companySlice.reducer;
