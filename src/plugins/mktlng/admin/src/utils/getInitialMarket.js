import getMarketFromQuery from './getMarketFromQuery';

const getInitialMarket = (query, markets = []) => {
  const marketFromQuery = getMarketFromQuery(query);
  if (marketFromQuery) {
    return markets.find(market => market.code === marketFromQuery);
  }
  // Returns the default market when nothing is in the query
  return markets.find(market => market.isDefault);
};

export default getInitialMarket;
