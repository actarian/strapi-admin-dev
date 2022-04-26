'use strict';

const isoMarkets = require('./isoMarket.data');

function getInitMarket() {
  const envMarketCode = process.env.STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE;
  if (envMarketCode) {
    const matchingMarket = isoMarkets.find(({ code }) => code === envMarketCode);
    if (!matchingMarket) {
      throw new Error(
        'Unknown market code provided in the environment variable STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE'
      );
    }
    return { ...matchingMarket };
  }
  return {
    code: 'WW',
    name: 'International',
  };
};

const DEFAULT_MARKET = getInitMarket();

module.exports = {
  isoMarkets,
  getInitMarket,
  DEFAULT_MARKET,
};
