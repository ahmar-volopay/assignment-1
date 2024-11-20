import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import companyReducer from './reducers/companyReducer';
const store = configureStore({
    reducer: {
        stocks: stockReducer,
        company: companyReducer,
    },
});

export default store;
