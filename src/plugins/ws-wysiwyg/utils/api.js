import { request } from '@strapi/helper-plugin';

export function getSettings() {
  return request('/ws-wysiwyg/')
}

export function updateSettings(settings) {
  return request('/ws-wysiwyg/update-settings', { method: 'PUT', body: settings })
}
