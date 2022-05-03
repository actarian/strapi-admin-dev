'use strict';

const { getSeoService } = require('../utils');

module.exports = {

  findSeoComponent(ctx) {
    ctx.body = getSeoService().getMetaComponent();
  },

  findContentTypes(ctx) {
    ctx.body = getSeoService().getContentTypes();
  },

  async createSeoComponent(ctx) {
    strapi.reload.isWatching = false;
    try {
      const data = await getSeoService().createSeoComponent();
      if (data) {
        setImmediate(() => strapi.reload());
      }
      ctx.body = data;
    } catch (error) {
      console.log(error);
    }
  },

};
