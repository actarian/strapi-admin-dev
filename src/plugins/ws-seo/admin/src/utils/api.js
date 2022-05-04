import { request } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

const fetchSeoComponent = async () => {
  try {
    const data = await request(`/${pluginId}/component`, { method: 'GET' });
    return data;
  } catch (error) {
    return null;
  }
};

const fetchContentTypes = async () => {
  try {
    const data = await request(`/${pluginId}/content-types`, { method: 'GET' });
    return data;
  } catch (error) {
    return null;
  }
};

const createSeoComponent = async () => {
  try {
    const data = await request(`/${pluginId}/component`, { method: 'POST' }, true);
    return data.json();
  } catch (error) {
    return null;
  }
};

const updateContentType_ = async (uid, schema) => {
  try {
    const data = await request(`/${pluginId}/update-content-type/${uid}`, {
      method: 'PUT',
      body: schema
    }, true);
    return data.json();
  } catch (error) {
    return null;
  }
};

const updateContentType = async (uid, schema) => {

  const response = await request(`/content-type-builder/content-types`, { method: 'GET' });
  const contentTypes = response.data;
  const contentType = contentTypes.find(x => x.uid === uid);

  console.log('updateContentType', contentTypes, contentType);

  if (!contentType) {
    return; // ctx.send({ error: 'contentType.notFound' }, 404);
  }

  console.log('updateContentType', uid);

  /*
  // !!! skip validation
  try {
    await validateUpdateContentTypeInput(body);
  } catch (error) {
    return ctx.send({ error }, 400);
  }
  */

  try {
    strapi.reload.isWatching = false;

    // const contentTypeBuilder = strapi.plugin('content-type-builder');
    // const contentTypesService = contentTypeBuilder.service('content-types');
    // console.log('contentTypesService', contentTypesService);

    /*
    const schema = await contentTypesService.editContentType(uid, {
      contentType: body,
    });
    */

    schema = await request(`/content-type-builder/content-type/${uid}`, { method: 'PUT', body: {
      contentType: schema,
      components: [],
    } }, true);

    setImmediate(() => strapi.reload());

    return schema;

  } catch (error) {
    return null;
  }
}

export { fetchSeoComponent, fetchContentTypes, createSeoComponent, updateContentType };
