'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('localized-text')
      .service('myService')
      .getWelcomeMessage();
  },
};
