import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
} from "../reducers/productReducer";
import axios from "axios";

export const fetchProduct = (limit = 15, skip = 0, selectedCategory = "", replace = false) => {
  return async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
      const url = selectedCategory
        ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      const response = await axios.get(url);

      dispatch(fetchProductSuccess({
        products: response.data.products,
        replace,
        total: response.data.total,
      }));
    } catch (error) {
      dispatch(fetchProductFailure(error.message));
    }
  };
};

export const updateProduct = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(updateProductRequest());
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, updatedData);
      dispatch(updateProductSuccess(response.data));
    } catch (error) {
      dispatch(updateProductFailure(error.message));
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const response = await axios.post("https://dummyjson.com/products/add", newProduct, {
        headers: { 'Content-Type': 'application/json' }
      });

      dispatch(createProductSuccess(response.data));
    } catch (error) {
      dispatch(createProductFailure(error.message));
    }
  };
};
