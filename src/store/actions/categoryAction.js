import axios from "axios";
import {fetchCategoryRequest, fetchCategorySuccess,fetchCategoryFailure} from "../reducers/categoryReducer";

export const fetchCategory = () => {
    return async (dispatch) => {
        dispatch(fetchCategoryRequest());
        try {
            const response = await axios.get(`https://dummyjson.com/products/categories`);
            dispatch(fetchCategorySuccess(response.data));
            console.log(response.data)
        } catch (error) {
            dispatch(fetchCategoryFailure(error.message));
        }    
    };
}