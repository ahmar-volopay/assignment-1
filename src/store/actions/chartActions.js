import axios from "axios";
import {fetchChartRequest, fetchChartSuccess, fetchChartFailure} from '../reducers/chartReducer';
import { resolve } from "chart.js/helpers";

export const fetchChart = (ticker) => async (dispatch) => {
    dispatch(fetchChartRequest());
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`);
        dispatch(fetchChartSuccess(response.data));
    } catch (error) {
        dispatch(fetchChartFailure(error.message)); 
    }
};
