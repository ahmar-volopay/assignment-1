import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from '../store/actions/stockActions';
import {
  topGainersMemoizedSelector,
  topLosersMemoizedSelector,
  loadingStateSelector,
  errorStateSelector,
  metadataStateSelector,
} from '../store/selectors/stockSelectors';
import Table from './core/Table';

const DashBoard = () => {
  const dispatch = useDispatch();

  const topGainers = useSelector(topGainersMemoizedSelector);
  const topLosers = useSelector(topLosersMemoizedSelector);
  const loading = useSelector(loadingStateSelector);
  const error = useSelector(errorStateSelector);
  const metadata = useSelector(metadataStateSelector);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const renderError = (errorMsg) => (
    <div className="text-center text-red-500 font-semibold py-2">
      Error: {errorMsg}
    </div>
  );

  const renderLoading = (type) => <p>Loading {type}...</p>;

  const getHeaders = (data) => {
    if (data && data.length > 0) {
      return Object.keys(data[0]); 
    }
    return [];
  };

  const gainersHeaders = getHeaders(topGainers);
  const losersHeaders = getHeaders(topLosers);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-4xl py-4">DashBoard</h1>
      <div className="text-center font-semibold text-2xl py-2">
        {loading ? renderLoading('metadata') : metadata}
      </div>
      {error && renderError(error)}
      <div className="flex justify-center gap-4 py-4">
        <div>
          {loading ? (
            renderLoading('top gainers')
          ) : (
            <Table
              data={topGainers}
              headers={gainersHeaders}
              bgColor="bg-green-200"
            />
          )}
        </div>
        <div>
          {loading ? (
            renderLoading('top losers')
          ) : (
            <Table
              data={topLosers}
              headers={losersHeaders}
              bgColor="bg-red-200"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
