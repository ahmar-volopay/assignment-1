import React from 'react';

const Indicator = ({ data, type }) => {
    const heading = type === 'gainers' ? 'Top Gainers:-' : 'Top Losers:-';
    const backgroundColor = type === 'gainers' ? 'bg-green-200' : 'bg-red-200';

    return (
        <>
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <table className={`table-auto w-full border-2 ${backgroundColor}`}>
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center border-b">Index</th>
                        <th className="px-4 py-2 text-center border-b">Ticker</th>
                        <th className="px-4 py-2 text-center border-b">Price</th>
                        <th className="px-4 py-2 text-center border-b">Change Amount</th>
                        <th className="px-4 py-2 text-center border-b">Change Percentage</th>
                        <th className="px-4 py-2 text-center border-b">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stock, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 text-center py-2 border-b">{index + 1}</td>
                            <td className="px-4 text-center py-2 border-b">{stock.ticker}</td>
                            <td className="px-4 text-center py-2 border-b">{stock.price}</td>
                            <td className="px-4 text-center py-2 border-b">{stock.change_amount}</td>
                            <td className="px-4 text-center py-2 border-b">{stock.change_percentage}</td>
                            <td className="px-4 text-center py-2 border-b">{stock.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Indicator;
