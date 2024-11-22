import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany } from '../store/actions/companyActions';
import {
  nameSelector,
  descSelector,
  addressSelector,
  currencySelector,
  exchangeSelector,
  sectorSelector,
  websiteSelector,
  profitMarginSelector,
  weekHigh52Selector,
  weekLow52Selector,
  epsSelector
} from '../store/selectors/companySelector';

import CompanyChart from './CompanyChart';

const CompanyPage = () => {
  const { ticker } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ticker) {
      dispatch(fetchCompany(ticker));
    }
  }, [ticker, dispatch]);

  const name = useSelector(nameSelector);
  const desc = useSelector(descSelector);
  const address = useSelector(addressSelector);
  const currency = useSelector(currencySelector);
  const exchange = useSelector(exchangeSelector);
  const sector = useSelector(sectorSelector);
  const website = useSelector(websiteSelector);
  const profitMargin = useSelector(profitMarginSelector);
  const weekHigh52 = useSelector(weekHigh52Selector);
  const weekLow52 = useSelector(weekLow52Selector);
  const eps = useSelector(epsSelector);

  const loading = useSelector((state) => state.company.loading);
  const error = useSelector((state) => state.company.error);

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-medium text-gray-600">{label}</span>
      <span>{value || 'N/A'}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading company data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <p className="text-lg text-gray-600">{ticker} • {exchange}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600 mb-1">52 Week High</h3>
          <p className="text-2xl font-bold">{currency} {weekHigh52 || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600 mb-1">52 Week Low</h3>
          <p className="text-2xl font-bold">{currency} {weekLow52 || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600 mb-1">EPS</h3>
          <p className="text-2xl font-bold">{currency} {eps || 'N/A'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Company Information</h2>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-600">{desc || 'No description available.'}</p>
        </div>

        <div className="space-y-2">
          <InfoRow label="Sector" value={sector} />
          <InfoRow
            label="Profit Margin"
            value={
              profitMargin !== null && profitMargin !== undefined
                ? `${(profitMargin * 100).toFixed(2)}%`
                : 'N/A'
            }
          />
          <InfoRow label="Address" value={address} />
          <InfoRow
            label="Website"
            value={
              website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {website}
                </a>
              ) : 'None'
            }
          />
        </div>
      </div>
      <div>
        <CompanyChart ticker={ticker} />
      </div>
    </div>
  );
};

export default CompanyPage;
