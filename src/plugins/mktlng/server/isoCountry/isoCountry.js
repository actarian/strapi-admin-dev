'use strict';

const isoCountries = require('./isoCountry.data');

function getInitCountry() {
  const envCountryCode = process.env.STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE;
  if (envCountryCode) {
    const matchingCountry = isoCountries.find(({ code }) => code === envCountryCode);
    if (!matchingCountry) {
      throw new Error(
        'Unknown market code provided in the environment variable STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE'
      );
    }
    return { ...matchingCountry };
  }
  return {
    code: 'WW',
    name: 'International',
  };
};

const DEFAULT_MARKET = getInitCountry();

module.exports = {
  isoCountries,
  getInitCountry,
  DEFAULT_MARKET,
};
