'use strict';

const { isoMarkets } = require('../constants');

const getIsoMarkets = () => isoMarkets;

module.exports = () => ({
  getIsoMarkets,
});
