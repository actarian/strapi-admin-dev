'use strict';

/**
 *  document controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::document.document');

/*
module.exports = createCoreController('api::document.document', ({ strapi }) => ({
  // find, findOne, create, update, delete

  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }

    // console.log('DocumentController.find', ctx.query);

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    // console.log('DocumentController.find', data, meta);

    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    // console.log('DocumentController.findOne', id, query);

    const entity = await strapi.service('api::document.document').findOne(id, query);

    // console.log('DocumentController.findOne', entity);

    // entity.title = JSON.parse(entity.title)[entity.locale];

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
*/

