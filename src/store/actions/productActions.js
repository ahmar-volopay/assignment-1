import {
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure,
} from "../reducers/productReducer";
import axios from "axios";

export const fetchProduct = (limit = 15, skip = 0) => {
    return async (dispatch) => {
      dispatch(fetchProductRequest());
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        dispatch(fetchProductSuccess(response.data));
      } catch (error) {
        dispatch(fetchProductFailure(error.message)); 
      }
    };
  };
  
