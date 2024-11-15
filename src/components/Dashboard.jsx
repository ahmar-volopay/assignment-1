import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gainer from './Gainer';
import Loser from './Loser';

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
            {/* <div>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre> // This part displays the data as formatted JSON
                ) : (
                    <p>Loading...</p>
                )}
            </div> */}
            <div className='flex '>
                <div>
                    {data && data.top_gainers ? (
                        <Gainer data={data.top_gainers} />
                    ) : (
                        <p>Loading top gainers...</p>
                    )}
                </div>
                <div>
                    {data && data.top_losers ? (
                        <Loser top={data.top_losers} />
                    ) : (
                        <p>Loading top losers...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashBoard;
