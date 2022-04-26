'use strict';

const { isoMarkets } = require('./isoMarket');

const getIsoMarkets = () => isoMarkets;

module.exports = () => ({
  getIsoMarkets,
});
