'use strict';

const formatMarket = market => {
  return {
    ...market,
    name: market.name || null,
  };
};

module.exports = { formatMarket };
