import { request, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOLVE_LOCALES } from '../constants';

const fetchLocalesList = async toggleNotification => {
  try {
    const data = await request('/mktlng/locales', { method: 'GET' });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return error;
  }
};

const useLocales = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const locales = useSelector(state => state.mktlng_locales.locales);
  const isLoading = useSelector(state => state.mktlng_locales.isLoading);

  useEffect(() => {
    fetchLocalesList(toggleNotification).then(locales =>
      dispatch({ type: RESOLVE_LOCALES, locales })
    );
  }, [dispatch, toggleNotification]);

  return { locales, isLoading };
};

export default useLocales;
