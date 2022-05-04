module.exports = [
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
