import { request, useNotification } from '@strapi/helper-plugin';
import get from 'lodash/get';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrad } from '../../utils';
import { ADD_LOCALE } from '../constants';

const addLocale = async ({ code, name, isDefault }, toggleNotification) => {
  const data = await request(`/mktlng/locales`, {
    method: 'POST',
    body: {
      name,
      code,
      isDefault,
    },
  });

  toggleNotification({
    type: 'success',
    message: { id: getTrad('Settings.locales.modal.create.success') },
  });

  return data;
};

const useAddLocale = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();

  const persistLocale = async locale => {
    setLoading(true);

    try {
      const newLocale = await addLocale(locale, toggleNotification);
      dispatch({ type: ADD_LOCALE, newLocale });
    } catch (e) {
      const message = get(e, 'response.payload.message', null);

      if (message && message.includes('already exists')) {
        toggleNotification({
          type: 'warning',
          message: { id: getTrad('Settings.locales.modal.create.alreadyExist') },
        });
      } else {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
      }

      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { isAdding: isLoading, addLocale: persistLocale };
};

export default useAddLocale;
