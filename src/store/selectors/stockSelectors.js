import { createSelector } from 'reselect';

const topGainersSelector = (state) => state.stocks.top_gainers;
const topLosersSelector = (state) => state.stocks.top_losers;
const loadingSelector = (state) => state.stocks.loading;
const errorSelector = (state) => state.stocks.error;
const metadataSelector = (state) => state.stocks.metadata;

export const topGainersMemoizedSelector = createSelector(
  [topGainersSelector], 
  (topGainers) => topGainers
);

export const topLosersMemoizedSelector = createSelector(
  [topLosersSelector],
  (topLosers) => topLosers
);

export const loadingStateSelector = createSelector(
  [loadingSelector],
  (loading) => loading
);

export const errorStateSelector = createSelector(
  [errorSelector],
  (error) => error
);

export const metadataStateSelector = createSelector(
  [metadataSelector],
  (metadata) => metadata
);

export const stocksSummarySelector = createSelector(
  [topGainersSelector, topLosersSelector],
  (topGainers, topLosers) => ({
    totalStocks: topGainers.length + topLosers.length,
    topGainersCount: topGainers.length,
    topLosersCount: topLosers.length,
  })
);
