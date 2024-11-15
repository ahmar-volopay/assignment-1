import React from 'react';

const Gainers = ({data}) => {
    return (
        <>
            <h2>Top Gainers</h2>
            {data && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Ticker: </th>
                            <th>Price: </th>
                            <th>Change Amount: </th>
                            <th>Change Percentage: </th>
                            <th>Volumne: </th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((gainer, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{gainer.ticker}</td>
                                <td>{gainer.price}</td>
                                <td>{gainer.change_amount}</td>
                                <td>{gainer.change_percentage}</td>
                                <td>{gainer.volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>No Gainers</p>)}
        </>
    );
};

export default Gainers;