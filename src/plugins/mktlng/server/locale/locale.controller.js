'use strict';

const utils = require('@strapi/utils');
const { pick } = require('lodash/fp');
const { getService } = require('../utils');
const { validateCreateLocaleInput, validateUpdateLocaleInput } = require('./locale.validation');
const { formatLocale } = require('./locale.domain');

const { setCreatorFields, sanitize } = utils;
const { ApplicationError } = utils.errors;

function sanitizeLocale(locale) {
  const model = strapi.getModel('plugin::mktlng.locale');
  return sanitize.contentAPI.output(locale, model);
}

async function listLocales(ctx) {
  const service = getService('locales');
  const locales = await service.find();
  const sanitizedLocales = await sanitizeLocale(locales);
  ctx.body = await service.setIsDefault(sanitizedLocales);
}

async function createLocale(ctx) {
  const { user } = ctx.state;
  const { body } = ctx.request;
  let { isDefault, ...localeToCreate } = body;
  await validateCreateLocaleInput(body);
  const service = getService('locales');
  const existingLocale = await service.findByCode(body.code);
  if (existingLocale) {
    throw new ApplicationError('This locale already exists');
  }
  localeToCreate = formatLocale(localeToCreate);
  localeToCreate = setCreatorFields({ user })(localeToCreate);
  const locale = await service.create(localeToCreate);
  if (isDefault) {
    await service.setDefaultLocale(locale);
  }
  const sanitizedLocale = await sanitizeLocale(locale);
  ctx.body = await service.setIsDefault(sanitizedLocale);
}

async function updateLocale(ctx) {
  const { user } = ctx.state;
  const { id } = ctx.params;
  const { body } = ctx.request;
  let { isDefault, ...updates } = body;
  await validateUpdateLocaleInput(body);
  const service = getService('locales');
  const existingLocale = await service.findById(id);
  if (!existingLocale) {
    return ctx.notFound('locale.notFound');
  }
  const allowedParams = ['name'];
  const cleanUpdates = setCreatorFields({ user, isEdition: true })(pick(allowedParams, updates));
  const updatedLocale = await service.update({ id }, cleanUpdates);
  if (isDefault) {
    await service.setDefaultLocale(updatedLocale);
  }
  const sanitizedLocale = await sanitizeLocale(updatedLocale);
  ctx.body = await service.setIsDefault(sanitizedLocale);
}

async function deleteLocale(ctx) {
  const { id } = ctx.params;
  const service = getService('locales');
  const existingLocale = await service.findById(id);
  if (!existingLocale) {
    return ctx.notFound('locale.notFound');
  }
  const defaultLocaleCode = await service.getDefaultLocale();
  if (existingLocale.code === defaultLocaleCode) {
    throw new ApplicationError('Cannot delete the default locale');
  }
  await service.delete({ id });
  const sanitizedLocale = await sanitizeLocale(existingLocale);
  ctx.body = await service.setIsDefault(sanitizedLocale);
}

module.exports = {
  listLocales,
  createLocale,
  updateLocale,
  deleteLocale,
};
