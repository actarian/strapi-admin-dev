'use strict';

const adminRoutes = [
];

const contentApiRoutes = [
  {
    method: 'GET',
    path: '/slugs/:modelName/:slug',
    handler: 'slug.findSlug',
  },
];

module.exports = {
  adminRoutes,
  contentApiRoutes,
};
