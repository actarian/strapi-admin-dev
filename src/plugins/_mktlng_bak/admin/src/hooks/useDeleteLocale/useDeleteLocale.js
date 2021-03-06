import { request, useNotification } from '@strapi/helper-plugin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrad } from '../../utils';
import { DELETE_LOCALE } from '../constants';

const deleteLocale = async (id, toggleNotification) => {
  try {
    const data = await request(`/mktlng/locales/${id}`, { method: 'DELETE' });
    toggleNotification({ type: 'success', message: { id: getTrad('settings.locales.modal.delete.success') } });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return error;
  }
};

const useDeleteLocale = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();

  const removeLocale = async id => {
    setLoading(true);
    await deleteLocale(id, toggleNotification);
    dispatch({ type: DELETE_LOCALE, id });
    setLoading(false);
  };

  return { isDeleting: isLoading, deleteLocale: removeLocale };
};

export default useDeleteLocale;
