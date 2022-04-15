'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-fields')
      .service('myService')
      .getWelcomeMessage();
  },
};
