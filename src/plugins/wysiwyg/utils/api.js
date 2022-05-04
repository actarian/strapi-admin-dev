import { request } from '@strapi/helper-plugin';

export function getSettings() {
  return request('/wysiwyg/')
}

export function updateSettings(settings) {
  return request('/wysiwyg/update-settings', { method: 'PUT', body: settings })
}
