import axios from "axios";
import {fetchChartRequest, fetchChartSuccess, fetchChartFailure} from '../reducers/chartReducer';
import { resolve } from "chart.js/helpers";

export const fetchChart = (ticker) => async (dispatch) => {
    dispatch(fetchChartRequest());
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=9GSE2C13UW8GYWW5`);
        dispatch(fetchChartSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        dispatch(fetchChartFailure(error.message)); 
    }
};
