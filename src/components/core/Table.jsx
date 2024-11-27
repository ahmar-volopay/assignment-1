import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Table = ({ 
  data, 
  headers, 
  bgColor, 
  renderRow, 
  onRowClick, 
  noDataMessage = "No data available" 
}) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (onRowClick) onRowClick(row);
    else if (row.ticker) navigate(`/company/${row.ticker}`);
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
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) =>
              renderRow ? (
                renderRow(row, index) // Use custom row rendering if provided
              ) : (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="px-4 text-center py-2 border-b">
                    {index + 1}
                  </td>
                  {headers.map((header) => (
                    <td key={header} className="px-4 text-center py-2 border-b">
                      {row[header] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">{noDataMessage}</p>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  bgColor: PropTypes.string,
  renderRow: PropTypes.func, // Custom row rendering function
  onRowClick: PropTypes.func, // Optional callback for row click
  noDataMessage: PropTypes.string,
};

export default Table;
