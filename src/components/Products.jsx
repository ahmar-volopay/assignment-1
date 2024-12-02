import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProduct, updateProduct, addProduct } from "../store/actions/productActions";
import { fetchCategory } from "../store/actions/categoryAction";
import { titleSelector, categorySelector, priceSelector, ratingSelector, stockSelector, totalSelector } from "../store/selectors/productSelector";
import { listCategorySelector } from "../store/selectors/categorySelector";
import { useInView } from "react-intersection-observer";
import Category from "./core/Category";
import Table from "./core/Table";
import Modal from "./core/Modal";
import { MODES } from "../constants/actionModes"; // Import MODES

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [prevCategory, setPrevCategory] = useState("");
  const [skip, setSkip] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(MODES.EDIT); // Use constant for mode
  const [selectedProduct, setSelectedProduct] = useState(null);

  const limit = 15;

  const listCategory = useSelector(listCategorySelector);
  const titles = useSelector(titleSelector);
  const categories = useSelector(categorySelector);
  const prices = useSelector(priceSelector);
  const ratings = useSelector(ratingSelector);
  const stocks = useSelector(stockSelector);
  const loading = useSelector((state) => state.product.fetchLoading);
  const error = useSelector((state) => state.product.fetchError);
  const total = useSelector(totalSelector);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (!isFetching) return;

    if (selectedCategory !== prevCategory || page === 0) {
      dispatch(fetchProduct(limit, 0, selectedCategory, true));
      setPrevCategory(selectedCategory);
      setSkip(limit);
      setPage(1);
    } else {
      dispatch(fetchProduct(limit, skip, selectedCategory, false));
      setSkip(skip + limit);
    }

    setIsFetching(false);
  }, [dispatch, isFetching, selectedCategory, prevCategory, page, skip]);

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setPage(0);
    setSkip(0);
    setIsFetching(true);
    setSearchParams({ category });
  };

  const handleClear = () => {
    setSelectedCategory("");
    setPage(0);
    setPrevCategory("");
    setSkip(0);
    setIsFetching(true);
    setSearchParams({});
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && !loading && page * limit < total) {
        setIsFetching(true);
      }
    },
  });

  useEffect(() => {
    if (!searchParams.get("category")) {
      setSearchParams({ category: "" });
    }
  }, [searchParams, setSearchParams]);

  const handleUpdate = (id, updatedData) => {
    const { id: _, ...dataToUpdate } = updatedData;
    dispatch(updateProduct(id, dataToUpdate));
    setModalVisible(false);
  };

  const handleAdd = (newItem) => {
    dispatch(addProduct(newItem));
    setModalVisible(false);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalMode(MODES.EDIT); // 
    setModalVisible(true);
  };

  const openAddModal = () => {
    setModalMode(MODES.ADD); 
    setModalVisible(true);
  };

  if (loading && page === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const data = titles.map((title, index) => ({
    id: index + 1,
    title,
    category: categories[index],
    price: `$${prices[index]}`,
    rating: ratings[index],
    stock: stocks[index],
  }));

  const headers = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "id") : [];

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl py-4">Product Table</h1>
      <div className="flex items-center justify-between">
        <div className="flex gap-between">
          <div className="p-2 flex items-center flex-wrap gap-2 font-semibold">
            <div>Filter by Categories: </div>
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
        </div>
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={openAddModal}
          >
            Add New Product
          </button>
        </div>
      </div>
      <Table
        data={data}
        headers={headers}
        editable={true}
        onUpdate={handleUpdate}
        excludeFields={['id']}
      />

      {loading && page > 0 && <p>Loading more products...</p>}
      <div ref={ref} style={{ height: "20px" }}></div>
      {page * limit >= total && (
        <div>
          <span>No more items</span>
        </div>
      )}
      {modalVisible && (
        <Modal
          item={selectedProduct}
          onClose={() => setModalVisible(false)}
          onSave={modalMode === MODES.ADD ? handleAdd : handleUpdate}
          mode={modalMode}
          headers={headers}
        />
      )}
    </div>
  );
};

export default Products;
