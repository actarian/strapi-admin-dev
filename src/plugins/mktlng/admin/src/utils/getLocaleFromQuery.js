import get from 'lodash/get';

const getLocaleFromQuery = query => {
  return get(query, 'plugins.mktlng.locale', undefined);
};

export default getLocaleFromQuery;
