import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany } from '../store/actions/companyActions'; 
import {
  getName,
  getDesc,
  getAddress,
  getCurrency,
  getExchange,
  getSector,
  getWebsite,
  getProfitMargin,
  getWeekHigh52,
  getWeekLow52,
  getEps
} from '../store/selectors/companySelector';

const CompanyPage = () => {
  const { ticker } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (ticker) {
      dispatch(fetchCompany(ticker));
    }
  }, [ticker, dispatch]);

  const name = useSelector(getName);
  const desc = useSelector(getDesc);
  const address = useSelector(getAddress);
  const currency = useSelector(getCurrency);
  const exchange = useSelector(getExchange);
  const sector = useSelector(getSector);
  const website = useSelector(getWebsite);
  const profitMargin = useSelector(getProfitMargin);
  const WeekHigh52 = useSelector(getWeekHigh52);
  const WeekLow52 = useSelector(getWeekLow52);
  const eps = useSelector(getEps);

  const loading = useSelector(state => state.company.loading);
  const error = useSelector(state => state.company.error);

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-medium text-gray-600">{label}</span>
      <span>{value}</span>
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
          <p className="text-2xl font-bold">{currency} {WeekHigh52}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600 mb-1">52 Week Low</h3>
          <p className="text-2xl font-bold">{currency} {WeekLow52}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600 mb-1">EPS</h3>
          <p className="text-2xl font-bold">{currency} {eps}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Company Information</h2>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-600">{desc}</p>
        </div>

        <div className="space-y-2">
          <InfoRow label="Sector" value={sector} />
          <InfoRow label="Profit Margin" value={`${(profitMargin * 100).toFixed(2)}%`} />
          <InfoRow label="Address" value={address} />
          <InfoRow 
            label="Website" 
            value={
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800"
              >
                {website}
              </a>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;