import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
} from "../reducers/productReducer";
import axios from "axios";

export const fetchProduct = (limit = 10, skip = 0, selectedCategory = "", replace = false) => {
  return async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
      const url = selectedCategory
        ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`; // Default fetch if no category
      const response = await axios.get(url);
      
      // Pass the replace flag along with the fetched data
      dispatch(fetchProductSuccess({ products: response.data.products, replace }));
      console.log(response.data);
      // console.log("API URL:", url);  
    } catch (error) {
      dispatch(fetchProductFailure(error.message));
    }
  };
};
