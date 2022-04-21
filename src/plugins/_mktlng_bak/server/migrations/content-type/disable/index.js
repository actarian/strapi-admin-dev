'use strict';

const { getService } = require('../../../utils');
const { DEFAULT_LOCALE } = require('../../../constants');

// Disable mktlng on CT -> Delete all entities that are not in the default locale
module.exports = async ({ oldContentTypes, contentTypes }) => {
  const { hasLocalizedContentType } = getService('content-types');
  const { getDefaultLocale } = getService('locales');
  if (!oldContentTypes) {
    return;
  }
  console.log('disable mktlng', Object.keys(contentTypes));
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    // if i18N is disabled remove non default locales before sync
    if (hasLocalizedContentType(oldContentType) && !hasLocalizedContentType(contentType)) {
      const defaultLocale = (await getDefaultLocale()) || DEFAULT_LOCALE.code;
      await strapi.db
        .queryBuilder(uid)
        .delete()
        .where({ locale: { $ne: defaultLocale } })
        .execute();
    }
  }
};
