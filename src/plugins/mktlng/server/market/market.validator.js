'use strict';

const { get } = require('lodash/fp');
const { ApplicationError } = require('@strapi/utils').errors;
const { getService } = require('../utils');

async function validateMarketCreation(ctx, next) {
  const { model } = ctx.params;
  const { query, body } = ctx.request;
  const { getValidMarket, getNewLocalizationsFrom, hasLocalizedContentType, getAndValidateRelatedEntity, fillNonLocalizedAttributes, } = getService('contentTypes');
  const modelDef = strapi.getModel(model);
  if (!hasLocalizedContentType(modelDef)) {
    return next();
  }
  const market = get('plugins.mktlng.market', query);
  const relatedEntityId = get('plugins.mktlng.relatedEntityId', query);
  // cleanup to avoid creating duplicates in singletypes
  ctx.request.query = {};
  let entityMarket;
  try {
    entityMarket = await getValidMarket(market);
  } catch (e) {
    throw new ApplicationError("This market doesn't exist");
  }
  body.market = entityMarket;
  if (modelDef.kind === 'singleType') {
    const entity = await strapi.entityService.findMany(modelDef.uid, { market: entityMarket });
    ctx.request.query.market = body.market;
    // updating
    if (entity) {
      return next();
    }
  }
  let relatedEntity;
  try {
    relatedEntity = await getAndValidateRelatedEntity(relatedEntityId, model, entityMarket);
  } catch (e) {
    throw new ApplicationError(
      "The related entity doesn't exist or the entity already exists in this market"
    );
  }
  fillNonLocalizedAttributes(body, relatedEntity, { model });
  const localizations = await getNewLocalizationsFrom(relatedEntity);
  body.localizations = localizations;
  return next();
};

module.exports = validateMarketCreation;
