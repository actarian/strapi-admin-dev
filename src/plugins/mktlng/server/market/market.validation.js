'use strict';

const { yup, validateYupSchema } = require('@strapi/utils');

// const { prop } = require('lodash/fp');
// const { isoMarkets } = require('../isoMarket/isoMarket');
// const allowedMarketCodes = isoMarkets.map(prop('code'));

const createMarketSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .min(1)
      .max(6)
      // .oneOf(allowedMarketCodes)
      .required(),
    name: yup
      .string()
      .min(1)
      .max(50)
      .nullable(),
    countries: yup
      .array()
      .nullable(),
    languages: yup
      .array()
      .nullable(),
    isDefault: yup.boolean().required(),
  })
  .noUnknown();

const updateMarketSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .min(1)
      .max(6)
      // .oneOf(allowedMarketCodes)
      .required(),
    name: yup
      .string()
      .min(1)
      .max(50)
      .nullable(),
    countries: yup
      .array()
      .nullable(),
    languages: yup
      .array()
      .nullable(),
    isDefault: yup.boolean(),
  })
  .noUnknown();

module.exports = {
  validateCreateMarketInput: validateYupSchema(createMarketSchema),
  validateUpdateMarketInput: validateYupSchema(updateMarketSchema),
};
