import React from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, headers, bgColor }) => {
  const navigate = useNavigate();

  const handleRowClick = (ticker) => {
    navigate(`/company/${ticker}`);
  };
  console.log(headers,data, bgColor);
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
                  {header.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((stock, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(stock.ticker)}
              >
                <td className="px-4 text-center py-2 border-b">{index + 1}</td>
                {headers.map((header) => (
                  <td key={header} className="px-4 text-center py-2 border-b">
                    {stock[header] ?? "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No data available</p>
      )}
    </div>
  );
};

export default Table;
