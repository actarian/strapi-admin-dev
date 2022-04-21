import { has } from 'lodash';

const extendCTBInitialDataMiddleware = () => {
  // console.log('extendCTBInitialDataMiddleware');
  return () => next => action => {
    // console.log('extendCTBInitialDataMiddleware', action.type, action.modalType);
    // strapi.log.debug('extendCTBInitialDataMiddleware', action.type, action.modalType);
    if (action.type === 'ContentTypeBuilder/FormModal/SET_DATA_TO_EDIT' && action.modalType === 'contentType') {
      const mktlng = { locales: false };
      const pluginOptions = action.data.pluginOptions ? { ...action.data.pluginOptions, mktlng } : { mktlng };
      const data = { ...action.data, pluginOptions };
      if (action.actionType === 'create') {
        return next({ ...action, data });
      }
      // Override the action if the pluginOption config does not contain mktlng
      // In this case we need to set the proper initialData shape
      if (!has(action.data.pluginOptions, 'mktlng.locales')) {
        return next({ ...action, data });
      }
    }
    // action is not the one we want to override
    return next(action);
  };
};

export default extendCTBInitialDataMiddleware;
