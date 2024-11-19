import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStocks } from '../store/actions/stockActions';
import Indicator from './Indicator';

const DashBoard = () => {
    const dispatch = useDispatch();
    const { loading, metadata, top_gainers, top_losers, error } = useSelector(
        (state) => state.stocks
    );

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center font-bold text-4xl py-4">DashBoard</h1>

            <div className="text-center font-semibold text-2xl py-2">
                {loading ? <p>Loading metadata...</p> : metadata}
            </div>

            {error && (
                <div className="text-center text-red-500 font-semibold py-2">
                    Error: {error}
                </div>
            )}

            <div className="flex justify-center gap-4 py-4">
                <div>
                    {loading ? (
                        <p>Loading top gainers...</p>
                    ) : (
                        <Indicator data={top_gainers} type="gainers" />
                    )}
                </div>
                <div>
                    {loading ? (
                        <p>Loading top losers...</p>
                    ) : (
                        <Indicator data={top_losers} type="losers" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
