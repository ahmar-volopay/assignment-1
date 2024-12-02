import React, { useState } from "react";
import Modal from "./Modal";

const Table = ({ data, headers, editable, onUpdate, excludeFields = [] }) => {
  const [editItem, setEditItem] = useState(null);

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleSave = (updatedData) => {
    onUpdate(editItem.id, updatedData);
    setEditItem(null);
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

      {editItem && (
        <Modal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Table;
