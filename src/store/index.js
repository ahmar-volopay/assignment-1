import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import companyReducer from './reducers/companyReducer';
import chartReducer from './reducers/chartReducer';
const store = configureStore({
    reducer: {
        stocks: stockReducer,
        company: companyReducer,
        chart: chartReducer,
    },
});

export default store;
