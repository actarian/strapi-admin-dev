'use strict';

const { getService } = require('../utils');

module.exports = {
  listIsoMarkets(ctx) {
    const isoMarketsService = getService('isoMarkets');
    ctx.body = isoMarketsService.getIsoMarkets();
  },
};
