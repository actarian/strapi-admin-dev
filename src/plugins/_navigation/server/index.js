'use strict';

const bootstrap = require('./bootstrap');
const services = require('./services');
const routes = require('./routes');
const controllers = require('./controllers');
const contentTypes = require('./content-types');
const config = require('./config');

module.exports = {
  bootstrap,
  config,
  controllers,
  routes,
  services,
  contentTypes,
};
