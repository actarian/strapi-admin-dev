'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/content-types',
    handler: 'content-types.getContentTypes',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/content-types/:uid',
    handler: 'content-types.getContentType',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/content-manager/actions/get-non-localized-fields',
    handler: 'content-types.getNonLocalizedAttributes',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];

const contentApiRoutes = [
];

module.exports = {
  adminRoutes,
  contentApiRoutes,
}
