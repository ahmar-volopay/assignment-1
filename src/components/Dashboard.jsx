import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from '../store/actions/stockActions';
import {
    getTopGainersMemoized,
    getTopLosersMemoized,
    getLoadingState,
    getErrorState,
    getMetadataState
} from '../store/selectors/stockSelectors';
import Indicator from './Indicator';

const DashBoard = () => {
    const dispatch = useDispatch();

    const topGainers = useSelector(getTopGainersMemoized);
    const topLosers = useSelector(getTopLosersMemoized);
    const loading = useSelector(getLoadingState);
    const error = useSelector(getErrorState);
    const metadata = useSelector(getMetadataState);

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

    const renderError = (errorMsg) => (
        <div className="text-center text-red-500 font-semibold py-2">
            Error: {errorMsg}
        </div>
    );

    const renderLoading = (type) => (
        <p>Loading {type}...</p>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center font-bold text-4xl py-4">DashBoard</h1>
            <div className="text-center font-semibold text-2xl py-2">
                {loading ? renderLoading('metadata') : metadata}
            </div>
            {error && renderError(error)}
            <div className="flex justify-center gap-4 py-4">
                <div>
                    {loading ? renderLoading('top gainers') : <Indicator data={topGainers} type="gainers" />}
                </div>
                <div>
                    {loading ? renderLoading('top losers') : <Indicator data={topLosers} type="losers" />}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
