import { createSelector } from 'reselect';
const getTopGainers = (state) => state.stocks.top_gainers;
const getTopLosers = (state) => state.stocks.top_losers;
const getLoading = (state) => state.stocks.loading;
const getError = (state) => state.stocks.error;
const getMetadata = (state) => state.stocks.metadata;

export const getTopGainersMemoized = createSelector(
  [getTopGainers], 
  (topGainers) => topGainers
);

export const getTopLosersMemoized = createSelector(
  [getTopLosers],
  (topLosers) => topLosers
);

export const getLoadingState = createSelector(
  [getLoading],
  (loading) => loading
);

export const getErrorState = createSelector(
  [getError],
  (error) => error
);

export const getMetadataState = createSelector(
  [getMetadata],
  (metadata) => metadata
);

export const getStocksSummary = createSelector(
  [getTopGainers, getTopLosers],
  (topGainers, topLosers) => ({
    totalStocks: topGainers.length + topLosers.length,
    topGainersCount: topGainers.length,
    topLosersCount: topLosers.length,
  }) g
);
