'use strict';

const bootstrap = require('./bootstrap');
const config = require('./config');
const controllers = require('./controllers');
const destroy = require('./destroy');
const register = require('./register');
const routes = require('./routes');
const services = require('./services');

module.exports = {
  bootstrap,
  config,
  controllers,
  destroy,
  register,
  routes,
  services,
  contentTypes: {},
  policies: {},
  middlewares: {},
};
