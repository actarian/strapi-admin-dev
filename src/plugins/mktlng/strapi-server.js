'use strict';

const bootstrap = require('./server/bootstrap');
const contentTypes = require('./server/contentTypes');
const controllers = require('./server/controllers');
const register = require('./server/register');
const routes = require('./server/routes');
const services = require('./server/services');

module.exports = () => ({
  bootstrap,
  contentTypes,
  controllers,
  register,
  routes,
  services,
});
