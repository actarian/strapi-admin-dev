'use strict';

const { get } = require('lodash/fp');
const { ApplicationError } = require('@strapi/utils').errors;
const { getService } = require('../utils');

async function validateMarketCreation(ctx, next) {
  const { model } = ctx.params;
  const { query, body } = ctx.request;
  const { getValidMarket, getNewLocalizationsFrom, hasLocalizedContentType, getAndValidateRelatedEntity, fillNonLocalizedAttributes, } = getService('contentTypes');
  const schema = strapi.getModel(model);
  if (!hasLocalizedContentType(schema)) {
    return next();
  }
  const market = get('plugins.mktlng.market', query);
  const relatedEntityId = get('plugins.mktlng.relatedEntityId', query);
  // cleanup to avoid creating duplicates in singletypes
  ctx.request.query = {};
  let entity;
  try {
    entity = await getValidMarket(market);
  } catch (e) {
    throw new ApplicationError('This market doesn\'t exist');
  }
  body.market = entity;
  if (schema.kind === 'singleType') {
    const entity = await strapi.entityService.findMany(schema.uid, { market: entity });
    ctx.request.query.market = body.market;
    // updating
    if (entity) {
      return next();
    }
  }
  let relatedEntity;
  try {
    relatedEntity = await getAndValidateRelatedEntity(relatedEntityId, model, entity);
  } catch (e) {
    throw new ApplicationError('The related entity doesn\'t exist or the entity already exists in this market');
  }
  fillNonLocalizedAttributes(body, relatedEntity, { model });
  const localizations = await getNewLocalizationsFrom(relatedEntity);
  body.localizations = localizations;
  return next();
};

module.exports = validateMarketCreation;
