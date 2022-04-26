'use strict';

const { isoMarkets } = require('./isoMarket');

function getIsoMarkets() {
  return isoMarkets;
}

module.exports = () => ({
  getIsoMarkets,
});
