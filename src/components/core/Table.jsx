import React, { useState } from "react";
import Modal from "./Modal";

const Table = ({ data, headers, editable, onUpdate, excludeFields = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (item) => {
    setSelectedItem(item); 
    setShowModal(true); 
  };

  const handleSave = (updatedData) => {
    onUpdate(selectedItem.id, updatedData);
    setShowModal(false); 
    setSelectedItem(null); 
  };

  const handleClose = () => {
    setShowModal(false); 
    setSelectedItem(null);
  };

  return (
    <div>
      <table className="table-auto w-full bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            {headers
              .filter((header) => !excludeFields.includes(header))
              .map((header, index) => (
                <th key={index} className="px-4 py-2">{header}</th>
              ))}
            {editable && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                <td className="border px-4 py-2">{row.id}</td>
                {Object.keys(row)
                  .filter((key) => !excludeFields.includes(key))
                  .map((key, index) => (
                    <td key={index} className="border px-4 py-2">{row[key]}</td>
                  ))}
                {editable && (
                  <td>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEditClick(row)}
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <Modal
        item={selectedItem}
        headers={headers}
        showModal={showModal} 
        onClose={handleClose} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Table;
