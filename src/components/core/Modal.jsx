import React, { useState } from "react";

const Modal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(item).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {key}
              </label>
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
