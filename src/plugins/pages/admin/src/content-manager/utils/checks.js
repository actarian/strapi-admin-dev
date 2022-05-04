import _ from 'lodash';
import { getRichTextCheck } from '.';

const getMetaTitleCheckPreview = (modifiedData) => {
  const title = _.get(modifiedData, 'meta.title');
  let status = { message: '', color: 'success' };
  if (_.isNull(title) || _.isEmpty(title)) {
    status = { message: '', color: 'danger' };
  } else if (title.length > 60) {
    status = { message: '', color: 'warning' };
  }
  return status;
};

const getMetaDescriptionPreview = (modifiedData) => {
  const description = _.get(modifiedData, 'meta.description');
  let status = { message: '', color: 'success' };
  if (_.isNull(description) || _.isEmpty(description)) {
    status = { message: '', color: 'danger' };
  } else if (description.length > 160) {
    status = { message: '', color: 'warning' };
  } else if (description.length < 50) {
    status = { message: '', color: 'warning' };
  }
  return status;
};

const getAlternativeTextPreview = (emptyAltCount) => {
  const intersections = _.get(emptyAltCount, 'intersections', null);
  const richTextAlts = _.get(emptyAltCount, 'richTextAlts', null);
  const altTexts = _.get(emptyAltCount, 'altTexts', null);
  let status = { message: '', color: 'success' };
  const missingRichTextAlt = richTextAlts.filter((x) => x.occurences != 0).length;
  if (intersections === 0) {
    status = { message: '', color: 'warning' };
  } else if (altTexts.includes('')) {
    status = { message: '', color: 'danger' };
  } else if (missingRichTextAlt >= 1) {
    status = { message: '', color: 'danger' };
  }
  return status;
};

const getWordCountPreview = (wordCount) => {
  let status = { message: '', color: 'success' };
  if (_.isNull(wordCount)) {
    status = { message: '', color: 'danger' };
    return;
  } else if (wordCount < 300) {
    status = { message: '', color: 'danger' };
  }
  return status;
};

const getKeywordDensityPreview = (keywordsDensity) => {
  let status = { message: '', color: 'success' };
  if (_.isEmpty(keywordsDensity)) {
    status = { message: '', color: 'danger' };
    return status;
  }
  Object.keys(keywordsDensity).map((keyword) => {
    if (_.get(keywordsDensity[keyword], 'count', 0) === 0) {
      status = { message: '', color: 'danger' };
    } else if (_.get(keywordsDensity[keyword], 'count', 0) <= 1) {
      status = { message: '', color: 'warning' };
    }
  });
  return status;
};

const canonicalUrlPreview = (modifiedData) => {
  const canonicalUrl = _.get(modifiedData, 'meta.canonicalURL');
  let status = { message: '', color: 'success' };
  if (_.isNull(canonicalUrl)) {
    status = { message: '', color: 'warning' };
  }
  return status;
};

const lastUpdatedAtPreview = (modifiedData) => {
  const updatedAt = _.get(modifiedData, 'updatedAt');
  let status = { message: '', color: 'danger' };
  if (_.isNull(updatedAt)) {
    status = { message: '', color: 'warning' };
  } else {
    const oneYearAgo = Date.parse(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
    if (Date.parse(updatedAt) >= oneYearAgo) {
      status = { message: '', color: 'success' };
    }
  }
  return status;
};

const metaRobotPreview = (modifiedData) => {
  const robots = _.get(modifiedData, 'meta.robots');
  let status = { message: '', color: 'success' };
  if (_.isNull(robots) || _.isEmpty(robots)) {
    status = { message: '', color: 'success' };
  }
  return status;
};

const metaSocialPreview = (modifiedData) => {
  const metaSocial = _.get(modifiedData, 'meta.metaSocial');
  let status = { message: '', color: '' };
  if (_.isNull(metaSocial) || metaSocial === undefined) {
    status = { message: '', color: 'danger' };
    return status;
  }
  const count = metaSocial.filter((meta) => !_.isNull(meta.id)).length;
  if (count === 0) {
    status = { message: '', color: 'danger' };
  } else if (count == 1) {
    status = { message: '', color: 'warning' };
  } else {
    status = { message: '', color: 'success' };
  }
  return status;
};

const structuredDataPreview = (modifiedData) => {
  const structuredData = _.get(modifiedData, 'meta.structuredData');
  let status = { message: '', color: 'success' };
  if (_.isEmpty(structuredData)) {
    status = { message: '', color: 'warning' };
  }
  return status;
};

const getAllChecks = (modifiedData, components, contentType) => {
  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(modifiedData, components, contentType);
  let result = {
    wordCount: getWordCountPreview(wordCount),
    robots: metaRobotPreview(modifiedData),
    metaSocial: metaSocialPreview(modifiedData),
    canonicalUrl: canonicalUrlPreview(modifiedData),
    title: getMetaTitleCheckPreview(modifiedData),
    lastUpdatedAt: lastUpdatedAtPreview(modifiedData),
    structuredData: structuredDataPreview(modifiedData),
    description: getMetaDescriptionPreview(modifiedData),
    alternativeText: getAlternativeTextPreview(emptyAltCount),
    keywordsDensity: getKeywordDensityPreview(keywordsDensity),
  };
  return result;
};

export { getMetaTitleCheckPreview, getAllChecks };

