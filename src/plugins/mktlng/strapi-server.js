'use strict';

const bootstrap = require('./server/bootstrap');
const contentTypes = require('./server/content-types/content-types');
const controllers = require('./server/controllers');
const register = require('./server/register');
const routes = require('./server/routes');
const services = require('./server/services/services');

module.exports = () => ({
  bootstrap,
  contentTypes,
  controllers,
  register,
  routes,
  services,
});
