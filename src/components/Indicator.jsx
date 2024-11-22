import React from 'react';
import { useNavigate } from 'react-router-dom';

const Indicator = ({ data, type }) => {

    const heading = type === 'gainers' ? 'Top Gainers:-' : 'Top Losers:-';
    const backgroundColor = type === 'gainers' ? 'bg-green-200' : 'bg-red-200';
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <>
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <table className={`table-auto w-full border-2 ${backgroundColor}`}>
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center border-b">Index</th>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-2 text-center border-b capitalize">
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
                        >
                            <td className="px-4 text-center py-2 border-b">{index + 1}</td>
                            {headers.map((header) => (
                                <td key={header} className="px-4 text-center py-2 border-b">
                                    {stock[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Indicator;
