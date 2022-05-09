'use strict';

const entityService = require('./entity/entity.service');
const slug = require('./slug/slug.service');
const seo = require('./seo/seo.service');
const permission = require('./permission/permission.service');

module.exports = {
  entityService,
  slug,
  seo,
  permission,
};
