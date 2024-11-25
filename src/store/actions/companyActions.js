import axios from 'axios'
import { fetchCompanyRequest, fetchCompanySuccess, fetchCompanyFailure } from '../reducers/companyReducer';

export const fetchCompany = (ticker) => async (dispatch) => {
    dispatch(fetchCompanyRequest());
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`);
        dispatch(fetchCompanySuccess(response.data));
    } catch (error) {
        dispatch(fetchCompanyFailure(error.message));
    }
}