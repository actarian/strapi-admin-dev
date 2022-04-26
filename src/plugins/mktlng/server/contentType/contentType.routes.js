'use strict';

const adminRoutes = [
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
