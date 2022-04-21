'use strict';

const { getService } = require('../utils');

module.exports = {
  listIsoMarkets(ctx) {
    const isoMarketsService = getService('iso-markets');
    ctx.body = isoMarketsService.getIsoMarkets();
  },
};
