import { translatedErrors as errorsTrads } from '@strapi/helper-plugin';
import { object, string } from 'yup';

export const localeValidationSchema = object().shape({
  code: string().required(),
  name: string().max(50, 'settings.locales.modal.locales.name.error').required(errorsTrads.required),
});

export const marketValidationSchema = object().shape({
  code: string().required().max(6, 'settings.markets.modal.markets.code.error').required(errorsTrads.required),
  name: string().max(50, 'settings.markets.modal.markets.name.error').required(errorsTrads.required),
});
