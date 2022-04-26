'use strict';

const utils = require('@strapi/utils');
const { pick } = require('lodash/fp');
const { getService } = require('../utils');
const { validateCreateMarketInput, validateUpdateMarketInput } = require('./market.validation');
const { formatMarket } = require('./market.domain');
const { setCreatorFields, sanitize } = utils;
const { ApplicationError } = utils.errors;

const sanitizeMarket = market => {
  const model = strapi.getModel('plugin::mktlng.market');
  return sanitize.contentAPI.output(market, model);
};

module.exports = {
  async listMarkets(ctx) {
    const marketsService = getService('markets');
    const markets = await marketsService.find();
    const sanitizedMarkets = await sanitizeMarket(markets);
    ctx.body = await marketsService.setIsDefault(sanitizedMarkets);
  },

  async createMarket(ctx) {
    const { user } = ctx.state;
    const { body } = ctx.request;
    let { isDefault, ...marketToCreate } = body;
    await validateCreateMarketInput(body);
    const marketsService = getService('markets');
    const existingMarket = await marketsService.findByCode(body.code);
    if (existingMarket) {
      throw new ApplicationError('This market already exists');
    }
    marketToCreate = formatMarket(marketToCreate);
    marketToCreate = setCreatorFields({ user })(marketToCreate);
    const market = await marketsService.create(marketToCreate);
    if (isDefault) {
      await marketsService.setDefaultMarket(market);
    }
    const sanitizedMarket = await sanitizeMarket(market);
    ctx.body = await marketsService.setIsDefault(sanitizedMarket);
  },

  async updateMarket(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const { body } = ctx.request;
    let { isDefault, ...updates } = body;
    await validateUpdateMarketInput(body);
    const marketsService = getService('markets');
    const existingMarket = await marketsService.findById(id);
    if (!existingMarket) {
      return ctx.notFound('market.notFound');
    }
    const allowedParams = ['name'];
    const cleanUpdates = setCreatorFields({ user, isEdition: true })(pick(allowedParams, updates));
    const updatedMarket = await marketsService.update({ id }, cleanUpdates);
    if (isDefault) {
      await marketsService.setDefaultMarket(updatedMarket);
    }
    const sanitizedMarket = await sanitizeMarket(updatedMarket);
    ctx.body = await marketsService.setIsDefault(sanitizedMarket);
  },

  async deleteMarket(ctx) {
    const { id } = ctx.params;
    const marketsService = getService('markets');
    const existingMarket = await marketsService.findById(id);
    if (!existingMarket) {
      return ctx.notFound('market.notFound');
    }
    const defaultMarketCode = await marketsService.getDefaultMarket();
    if (existingMarket.code === defaultMarketCode) {
      throw new ApplicationError('Cannot delete the default market');
    }
    await marketsService.delete({ id });
    const sanitizedMarket = await sanitizeMarket(existingMarket);
    ctx.body = await marketsService.setIsDefault(sanitizedMarket);
  },
};
