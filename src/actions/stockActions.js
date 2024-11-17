import {
    FETCH_STOCKS_REQUEST,
    FETCH_STOCKS_SUCCESS,
    FETCH_STOCKS_FAILURE
} from '../actionTypes';

export const fetchStocks = () => async (dispatch) => {
    dispatch({ type: FETCH_STOCKS_REQUEST });
    try {
        const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
        if (!response.ok) throw new Error('Failed to Fetch Data');
        const data = await response.json();
        dispatch({ type: FETCH_STOCKS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FETCH_STOCKS_FAILURE, payload: error.message });
    }
}