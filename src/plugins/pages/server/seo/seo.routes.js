'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/component',
    handler: 'seo.findSeoComponent',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/component',
    handler: 'seo.createSeoComponent',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/content-types',
    handler: 'seo.findContentTypes',
    config: {
      auth: false,
      policies: [],
    },
  },
];

const contentApiRoutes = adminRoutes;

module.exports = {
  adminRoutes,
  contentApiRoutes,
}
