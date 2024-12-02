import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onSave, rowData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (rowData) {
      setFormData({ ...rowData });
    }
  }, [rowData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (JSON.stringify(rowData) !== JSON.stringify(formData)) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Row</h2>
        {Object.keys(rowData || {}).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-medium mb-2 capitalize">
              {key.replace("_", " ")}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  rowData: PropTypes.object,
};

export default Modal;
