'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/pages',
    handler: 'page.getPages',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/page-by-slug/:slug?',
    handler: 'page.getPageBySlug',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/update-content-type/:uid',
    handler: 'page.updateContentType',
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
