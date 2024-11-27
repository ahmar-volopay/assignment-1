import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  titleSelector,
  categorySelector,
  priceSelector,
  ratingSelector,
  stockSelector,
  totalSelector,
} from "../store/selectors/productSelector";
import { fetchProduct } from "../store/actions/productActions";
import { listCategorySelector } from "../store/selectors/categorySelector";
import { fetchCategory } from "../store/actions/categoryAction";
import Category from "./core/Category";
import { useInView } from "react-intersection-observer";
import Table from "./core/Table";

const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prevCategory, setPrevCategory] = useState("");

  const limit = 15;

  const listCategory = useSelector(listCategorySelector);
  const titles = useSelector(titleSelector);
  const categories = useSelector(categorySelector);
  const prices = useSelector(priceSelector);
  const ratings = useSelector(ratingSelector);
  const stocks = useSelector(stockSelector);
  const total = useSelector(totalSelector);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);


  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    const shouldReplace = selectedCategory !== prevCategory;
    if (shouldReplace) {
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

  const tableData = titles.map((title, index) => ({
    title,
    category: categories[index],
    price: prices[index],
    rating: ratings[index],
    stock: stocks[index],
  }));

  const tableHeaders = ["title", "category", "price", "rating", "stock"];

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl py-4">Product Table</h1>

      <div className="p-2 flex items-center flex-wrap gap-2 font-semibold">
        <div>Filter from Categories: </div>
        {listCategory.length > 0
          ? listCategory.slice(0, 5).map((category, index) => (
              <Category
                key={category.slug}
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
            dispatch(fetchProduct(limit, 0, "", true));
          }}
        >
          Clear
        </button>
      </div>

      <Table
        data={tableData}
        headers={tableHeaders}
        bgColor="bg-white"
        noDataMessage="No products available"
        renderRow={(row, index) => (
          <tr key={index} className="hover:bg-gray-100 cursor-pointer">
            <td className="px-4 text-center py-2 border-b">{index + 1}</td>
            <td className="px-4 text-center py-2 border-b">{row.title}</td>
            <td className="px-4 text-center py-2 border-b">{row.category}</td>
            <td className="px-4 text-center py-2 border-b">${row.price}</td>
            <td className="px-4 text-center py-2 border-b">{row.rating}</td>
            <td className="px-4 text-center py-2 border-b">{row.stock}</td>
          </tr>
        )}
      />

      {loading && page > 0 && <p>Loading more products...</p>}
      <div ref={ref} style={{ height: "20px" }}></div>
      {page * limit > total && (
        <div className="flex justify-center font-bold">
          X - End of the List - X
        </div>
      )}
    </div>
  );
};

export default Products;
