import { translatedErrors as errorsTrads } from '@strapi/helper-plugin';
import { object, string } from 'yup';

export const localeValidationSchema = object().shape({
  code: string().required(),
  displayName: string().max(50, 'settings.locales.modal.locales.displayName.error').required(errorsTrads.required),
});

export const marketValidationSchema = object().shape({
  code: string().required(),
  displayName: string().max(50, 'settings.markets.modal.markets.displayName.error').required(errorsTrads.required),
});
