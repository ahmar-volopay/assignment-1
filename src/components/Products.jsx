import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { titleSelector, categorySelector, priceSelector, ratingSelector, stockSelector } from "../store/selectors/productSelector";

const Product = () => {
  const dispatch = useDispatch();

  const titles = useSelector(titleSelector);
  const categories = useSelector(categorySelector);
  const prices = useSelector(priceSelector);
  const ratings = useSelector(ratingSelector);
  const stocks = useSelector(stockSelector);

  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-center font-bold text-2xl py-4">Product Table</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {titles.length > 0 && titles.map((title, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{title}</td>
              <td className="border px-4 py-2">{categories[index]}</td>
              <td className="border px-4 py-2">${prices[index]}</td>
              <td className="border px-4 py-2">{ratings[index]}</td>
              <td className="border px-4 py-2">{stocks[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
