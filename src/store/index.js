import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import companyReducer from './reducers/companyReducer';
import chartReducer from './reducers/chartReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
const store = configureStore({
    reducer: {
        stocks: stockReducer,
        company: companyReducer,
        chart: chartReducer,
        product: productReducer,
        category: categoryReducer,
    },
});

export default store;
