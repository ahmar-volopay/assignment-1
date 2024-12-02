import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component

const Table = ({
  data,
  headers,
  bgColor,
  renderRow,
  onRowClick,
  noDataMessage = "No data available",
  editable,
  passUpdateIndex,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleSave = (updatedRow) => {
    console.log("Updated Row:", updatedRow);
    passUpdateIndex(updatedRow); // Call the callback with updated data
  };

  return (
    <div className="overflow-x-auto">
      {data && data.length > 0 ? (
        <table className={`table-auto w-full border-2 ${bgColor}`}>
          <thead>
            <tr>
              <th className="px-4 py-2 text-center border-b">Index</th>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-center border-b capitalize"
                >
                  {header.replace("_", " ")}
                </th>
              ))}
              {editable && (
                <th className="px-4 py-2 text-center border-b">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) =>
              renderRow ? (
                renderRow(row, index)
              ) : (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  <td className="px-4 text-center py-2 border-b">
                    {index + 1}
                  </td>
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 text-center py-2 border-b"
                    >
                      {row[header] ?? "N/A"}
                    </td>
                  ))}
                  {editable && (
                    <td className="px-4 text-center py-2 border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(row);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">{noDataMessage}</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        rowData={selectedRow}
      />
    </div>
  );
};

export default Table;
