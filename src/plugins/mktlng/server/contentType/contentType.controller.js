'use strict';

const { pick, uniq, prop, getOr, flatten, pipe, map } = require('lodash/fp');
const { contentTypes: contentTypesUtils } = require('@strapi/utils');
const { ApplicationError } = require('@strapi/utils').errors;
const { getService } = require('../utils');
const { validateGetNonLocalizedAttributesInput } = require('./contentType.validation');

const { PUBLISHED_AT_ATTRIBUTE } = contentTypesUtils.constants;

const getLocalesProperty = getOr([], 'properties.locales');
const getFieldsProperty = prop('properties.fields');

const getFirstLevelPath = map(path => path.split('.')[0]);

function getContentTypes(ctx) {
  const service = getService('contentTypes');
  const contentTypes = service.getContentTypes();
  ctx.body = contentTypes;
}

function getContentType(ctx) {
  const { uid } = ctx.params;
  const service = getService('contentTypes');
  const contentType = service.getContentType(uid);
  ctx.body = contentType;
}

async function getNonLocalizedAttributes(ctx) {
  const { user } = ctx.state;
  const { model, id, locale } = ctx.request.body;

  await validateGetNonLocalizedAttributesInput({ model, id, locale });

  const service = getService('contentTypes');
  const { READ_ACTION, CREATE_ACTION } = strapi.admin.services.constants;

  const modelDef = strapi.contentType(model);
  const attributesToPopulate = service.getNestedPopulateOfNonLocalizedAttributes(model);

  if (!service.hasLocalizedContentType(modelDef)) {
    throw new ApplicationError('model.not.localized');
  }

  let params = modelDef.kind === 'singleType' ? {} : { id };

  const entity = await strapi
    .query(model)
    .findOne({ where: params, populate: [...attributesToPopulate, 'localizations'] });

  if (!entity) {
    return ctx.notFound();
  }

  const permissions = await strapi.admin.services.permission.findMany({
    where: {
      action: [READ_ACTION, CREATE_ACTION],
      subject: model,
      role: {
        id: user.roles.map(prop('id')),
      },
    },
  });

  const localePermissions = permissions
    .filter(perm => getLocalesProperty(perm).includes(locale))
    .map(getFieldsProperty);

  const permittedFields = pipe(flatten, getFirstLevelPath, uniq)(localePermissions);

  const nonLocalizedFields = service.copyNonLocalizedAttributes(modelDef, entity);
  const sanitizedNonLocalizedFields = pick(permittedFields, nonLocalizedFields);

  ctx.body = {
    nonLocalizedFields: sanitizedNonLocalizedFields,
    localizations: entity.localizations.concat(
      pick(['id', 'locale', PUBLISHED_AT_ATTRIBUTE], entity)
    ),
  };
}

module.exports = {
  getContentTypes,
  getContentType,
  getNonLocalizedAttributes,
};
