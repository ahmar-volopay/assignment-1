import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { titleSelector, categorySelector, priceSelector, ratingSelector, stockSelector, totalSelector } from "../store/selectors/productSelector";
import { listCategorySelector } from "../store/selectors/categorySelector";
import Category from "./core/Category";
import { useInView } from "react-intersection-observer";
import { fetchCategory } from "../store/actions/categoryAction";

const Product = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prevCategory, setPrevCategory] = useState("");

  // Per page/scroll fetch limit = 10-15
  const limit = 10;

  // Fetching Categories from Categories-only API 
  const listCategory = useSelector(listCategorySelector);

  const titles = useSelector(titleSelector);
  const categories = useSelector(categorySelector);
  const prices = useSelector(priceSelector);
  const ratings = useSelector(ratingSelector);
  const stocks = useSelector(stockSelector);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const total = useSelector(totalSelector);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    const shouldReplace = selectedCategory !== prevCategory;
    if (selectedCategory !== prevCategory) {
      setPage(0);
      setPrevCategory(selectedCategory);
    }
    dispatch(fetchProduct(limit, page * limit, selectedCategory, shouldReplace));
  }, [dispatch, page, selectedCategory, prevCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && !loading && page * limit < total) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  if (loading && page === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl py-4">Product Table</h1>

      <div className="p-2 flex items-center flex-wrap gap-2 font-semibold">
        <div>Filter from Categories: </div>
        {listCategory.length > 0
          ? listCategory.slice(0, 5).map((category, index) => (
            <Category
              key={index}
              name={category.name}
              onClick={() => handleCategoryClick(category.slug)}
            />
          ))
          : "No categories available"}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setSelectedCategory("");  
            setPage(0);               
            setPrevCategory("");      
            dispatch(fetchProduct(10, 0, "", true)); //Force Clear
          }}
        >
          Clear
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-800">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Index</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {titles.length > 0 ? (
            titles.map((title, index) => (
              <tr key={`${title}-${index}`}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{title}</td>
                <td className="border px-4 py-2">{categories[index]}</td>
                <td className="border px-4 py-2">${prices[index]}</td>
                <td className="border px-4 py-2">{ratings[index]}</td>
                <td className="border px-4 py-2">{stocks[index]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && page > 0 && <p>Loading more products...</p>}
      <div ref={ref} style={{ height: "20px" }}></div>
      {
        page * limit > total &&
        <div className="flex justify-center font-bold">X - End of the List - X</div>
      }
    </div>
  );
};

export default Product;
