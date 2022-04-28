import { request } from '@strapi/helper-plugin';

export function getSettings() {
  return request('/tiptap-editor/')
}

export function updateSettings(settings) {
  return request('/tiptap-editor/update-settings', { method: 'PUT', body: settings })
}
