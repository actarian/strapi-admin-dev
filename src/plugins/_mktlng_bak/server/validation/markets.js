'use strict';

const { prop } = require('lodash/fp');
const { yup, validateYupSchema } = require('@strapi/utils');

const { isoMarkets } = require('../constants');

const allowedMarketCodes = isoMarkets.map(prop('code'));

const createMarketSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .max(50)
      .nullable(),
    code: yup
      .string()
      .oneOf(allowedMarketCodes)
      .required(),
    isDefault: yup.boolean().required(),
  })
  .noUnknown();

const updateMarketSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(1)
      .max(50)
      .nullable(),
    isDefault: yup.boolean(),
  })
  .noUnknown();

module.exports = {
  validateCreateMarketInput: validateYupSchema(createMarketSchema),
  validateUpdateMarketInput: validateYupSchema(updateMarketSchema),
};
