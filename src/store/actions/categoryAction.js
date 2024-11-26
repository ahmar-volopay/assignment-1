import axios from "axios";
import {
    fetchCategoryRequest,
    fetchCategorySuccess,
    fetchCategoryFailure,
} from "../reducers/categoryReducer";

export const fetchCategory = () => {
    return async (dispatch) => {
        dispatch(fetchCategoryRequest());
        try {
            const response = await axios.get(`https://dummyjson.com/products/categories`);
            const slicedCategories = response.data.slice(0, 5);
            dispatch(fetchCategorySuccess(slicedCategories));
            console.log(slicedCategories);
        } catch (error) {
            dispatch(fetchCategoryFailure(error.message));
        }
    };
};
