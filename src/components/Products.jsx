import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { titleSelector, categorySelector, priceSelector, ratingSelector, stockSelector, totalSelector } from "../store/selectors/productSelector";
import { listCategorySelector } from "../store/selectors/categorySelector";
import Category from "./core/Category";
import { useInView } from "react-intersection-observer";
import { fetchCategory } from "../store/actions/categoryAction";

const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prevCategory, setPrevCategory] = useState("");
  const [skip, setSkip] = useState(0);
  const [isFetching, setIsFetching] = useState(false); // New flag to control calls

  const limit = 15;

  const listCategory = useSelector(listCategorySelector);
  const titles = useSelector(titleSelector);
  const categories = useSelector(categorySelector);
  const prices = useSelector(priceSelector);
  const ratings = useSelector(ratingSelector);
  const stocks = useSelector(stockSelector);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const total = useSelector(totalSelector);

  // Fetch categories once
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // Handle API fetch for products
  useEffect(() => {
    if (!isFetching) return; // Prevent duplicate fetches
    if (selectedCategory !== prevCategory || page === 0) {
      // Fetch new category
      dispatch(fetchProduct(limit, 0, selectedCategory, true));
      setPrevCategory(selectedCategory);
      setSkip(limit); // Set skip for the next fetch
      setPage(1); // Reset page
    } else {
      // Fetch for pagination
      dispatch(fetchProduct(limit, skip, selectedCategory, false));
      setSkip(skip + limit);
    }
    setIsFetching(false); // Reset the fetching flag
  }, [dispatch, isFetching, selectedCategory, prevCategory, page, skip]);

  // Trigger fetching for category change
  const handleCategoryClick = (category) => {
    if (category === selectedCategory) return; // Prevent unnecessary updates
    setSelectedCategory(category);
    setPage(0);
    setSkip(0);
    setIsFetching(true); // Trigger a new fetch
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && !loading && page * limit < total) {
        setIsFetching(true); // Trigger the next page fetch
      }
    },
  });

  const handleClear = () => {
    setSelectedCategory("");
    setPage(0);
    setPrevCategory("");
    setSkip(0);
    setIsFetching(true); // Trigger a reset fetch
  };

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
          onClick={handleClear}
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
      {page * limit > total && (
        <div className="flex justify-center font-bold">X - End of the List - X</div>
      )}
    </div>
  );
};

export default Products;
