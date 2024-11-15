import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Indicator from './Indicator';

const DashBoard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo')
            .then((response) => {
                setData(response.data);
                
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }, []);
    

    return (
        <>
            <div className='flex justify-center font-bold py-4 text-4xl'>DashBoard</div>
            <div className="flex justify-center font-semibold py-2 text-2xl">
                {data && data.metadata ? (
                    <div>{data.metadata}</div>
                ) : (
                    <p>Loading metadata...</p>
                )}
            </div>
            <div className='flex justify-center'>
                <div>
                    {data && data.top_gainers ? (
                        <Indicator data={data.top_gainers} type="gainers"/>
                    ) : (
                        <p>Loading top gainers...</p>
                    )}
                </div>
                <div>
                    {data && data.top_losers ? (
                        <Indicator data={data.top_losers} type="losers"/>
                    ) : (
                        <p>Loading top losers...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashBoard;
