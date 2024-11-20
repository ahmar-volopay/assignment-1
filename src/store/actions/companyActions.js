import axios from 'axios'
import { fetchCompanyRequest, fetchCompanySuccess, fetchCompanyFailure } from '../reducers/CompanyReducer';

export const fetchCompany = () => async (dispatch) => {
    dispatch(fetchCompanyRequest());
    try {
        const response = await axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo')
        dispatch(fetchCompanySuccess(response.data));
    } catch (error) {
        dispatch(fetchCompanyFailure(error.message));
    }
}