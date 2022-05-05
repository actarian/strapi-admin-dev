'use strict';

const page = require('./page/page.routes');
const slug = require('./slug/slug.routes');
const seo = require('./seo/seo.routes');

module.exports = {
  admin: {
    type: 'admin',
    routes: [
      ...page.adminRoutes,
      ...slug.adminRoutes,
      ...seo.adminRoutes,
    ]
  },
  'content-api': {
    type: 'content-api',
    routes: [
      ...page.contentApiRoutes,
      ...slug.contentApiRoutes,
      ...seo.contentApiRoutes,
    ]
  },
};
