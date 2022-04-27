'use strict';

const utils = require('@strapi/utils');
const { pick } = require('lodash/fp');
const { getService } = require('../utils');
const { validateCreateMarketInput, validateUpdateMarketInput } = require('./market.validation');
const { formatMarket } = require('./market.domain');
const { setCreatorFields, sanitize } = utils;
const { ApplicationError } = utils.errors;

function sanitizeMarket(market) {
  const model = strapi.getModel('plugin::mktlng.market');
  return sanitize.contentAPI.output(market, model);
}

async function listMarkets(ctx) {
  const service = getService('markets');
  const markets = await service.find();
  const sanitizedMarkets = await sanitizeMarket(markets);
  ctx.body = await service.setIsDefault(sanitizedMarkets);
}

async function createMarket(ctx) {
  const { user } = ctx.state;
  const { body } = ctx.request;
  let { isDefault, ...marketToCreate } = body;
  await validateCreateMarketInput(body);
  const service = getService('markets');
  const existingMarket = await service.findByCode(body.code);
  if (existingMarket) {
    throw new ApplicationError('This market already exists');
  }
  marketToCreate = formatMarket(marketToCreate);
  marketToCreate = setCreatorFields({ user })(marketToCreate);
  const market = await service.create(marketToCreate);
  if (isDefault) {
    await service.setDefaultMarket(market);
  }
  const sanitizedMarket = await sanitizeMarket(market);
  ctx.body = await service.setIsDefault(sanitizedMarket);
}

async function updateMarket(ctx) {
  const { user } = ctx.state;
  const { id } = ctx.params;
  const { body } = ctx.request;
  let { isDefault, ...updates } = body;
  await validateUpdateMarketInput(body);
  const service = getService('markets');
  const existingMarket = await service.findById(id);
  if (!existingMarket) {
    return ctx.notFound('market.notFound');
  }
  const allowedParams = ['name'];
  const cleanUpdates = setCreatorFields({ user, isEdition: true })(pick(allowedParams, updates));
  const updatedMarket = await service.update({ id }, cleanUpdates);
  if (isDefault) {
    await service.setDefaultMarket(updatedMarket);
  }
  const sanitizedMarket = await sanitizeMarket(updatedMarket);
  ctx.body = await service.setIsDefault(sanitizedMarket);
}

async function deleteMarket(ctx) {
  const { id } = ctx.params;
  const service = getService('markets');
  const existingMarket = await service.findById(id);
  if (!existingMarket) {
    return ctx.notFound('market.notFound');
  }
  const defaultMarketCode = await service.getDefaultMarket();
  if (existingMarket.code === defaultMarketCode) {
    throw new ApplicationError('Cannot delete the default market');
  }
  await service.delete({ id });
  const sanitizedMarket = await sanitizeMarket(existingMarket);
  ctx.body = await service.setIsDefault(sanitizedMarket);
}

module.exports = {
  listMarkets,
  createMarket,
  updateMarket,
  deleteMarket,
};
