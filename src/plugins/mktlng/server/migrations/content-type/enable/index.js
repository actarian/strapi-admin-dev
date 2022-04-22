'use strict';

const { getService } = require('../../../utils');
const { DEFAULT_LOCALE } = require('../../../constants');

// if Mktlng enabled set default locale
module.exports = async ({ oldContentTypes, contentTypes }) => {
  const { hasLocalizedContentType } = getService('contentTypes');
  const { getDefaultLocale } = getService('locales');
  if (!oldContentTypes) {
    return;
  }
  console.log('enable mktlng', Object.keys(contentTypes));
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    if (!hasLocalizedContentType(oldContentType) && hasLocalizedContentType(contentType)) {
      const defaultLocale = (await getDefaultLocale()) || DEFAULT_LOCALE.code;
      await strapi.db
        .queryBuilder(uid)
        .update({ locale: defaultLocale })
        .where({ locale: null })
        .execute();
    }
  }
};
