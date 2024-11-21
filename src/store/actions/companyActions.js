import axios from 'axios'
import { fetchCompanyRequest, fetchCompanySuccess, fetchCompanyFailure } from '../reducers/CompanyReducer';

export const fetchCompany = (ticker) => async (dispatch) => {
    dispatch(fetchCompanyRequest());
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=9GSE2C13UW8GYWW5`);
        // apikey=9GSE2C13UW8GYWW5
        dispatch(fetchCompanySuccess(response.data));
    } catch (error) {
        dispatch(fetchCompanyFailure(error.message));
    }
}