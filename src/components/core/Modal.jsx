import React, { useState, useEffect } from "react";
import { MODES } from "../../constants/actionModes";

const Modal = ({ item, onClose, onSave, mode = MODES.EDIT, headers, showModal }) => {
  const initialFormData =
    mode === MODES.ADD
      ? headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {})
      : { ...item };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(
      mode === MODES.ADD
        ? headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {})
        : { ...item }
    );
  }, [item, mode, headers]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === MODES.ADD) {
      onSave(formData);
    } else {
      onSave({ ...formData, id: item?.id });
    }
  };

  if (!showModal) return null; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-bold mb-4">
          {mode === MODES.ADD ? "Add New Item" : "Edit Item"}
        </h2>
        <form onSubmit={handleSubmit}>
          {headers.map((header, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">{header}</label>
              <input
                type="text"
                value={formData[header] || ""}
                onChange={(e) => handleChange(header, e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {mode === MODES.ADD ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
