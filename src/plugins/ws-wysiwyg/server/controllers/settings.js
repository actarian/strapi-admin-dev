'use strict';

const packageInfo = require('../../package.json');
const defaultSettings = require('../../utils/defaults.js')

module.exports = {
  async index(ctx) {
    const savedSettings = await strapi.store({ type: 'plugin', name: 'ws-wysiwyg', key: 'settings' }).get()
    if (savedSettings !== null) {
      ctx.send(savedSettings)
    } else {
      ctx.send(defaultSettings)
    }
  },
  async updateSettings(ctx) {
    const newSettings = ctx.request.body
    await strapi.store({ type: 'plugin', name: 'ws-wysiwyg', key: 'settings' }).set({ value: newSettings })
    ctx.send({ res: 'ok' })
  },

};
