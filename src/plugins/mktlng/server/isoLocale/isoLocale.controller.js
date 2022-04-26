'use strict';

const { getService } = require('../utils');

module.exports = {
  listIsoLocales(ctx) {
    const isoLocalesService = getService('isoLocales');
    ctx.body = isoLocalesService.getIsoLocales();
  },
};
