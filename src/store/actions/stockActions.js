import axios from 'axios';
import { fetchStocksRequest, fetchStocksSuccess, fetchStocksFailure } from '../reducers/stockReducer';

export const fetchStocks = () => async (dispatch) => {
    dispatch(fetchStocksRequest());
    try {
        const response = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=8R81N8SXJLLVWXEV');
        dispatch(fetchStocksSuccess(response.data));
    } catch (error) {
        dispatch(fetchStocksFailure(error.message));
    }
};
