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

const updateContentType = async (uid, schema) => {
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

export { fetchSeoComponent, fetchContentTypes, createSeoComponent, updateContentType };
