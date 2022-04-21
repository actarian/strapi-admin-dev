import get from 'lodash/get';

const getMarketFromQuery = query => {
  return get(query, 'plugins.mktlng.market', undefined);
};

export default getMarketFromQuery;
