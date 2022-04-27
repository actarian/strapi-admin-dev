import { request, useNotification } from '@strapi/helper-plugin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrad } from '../../utils';
import { DELETE_MARKET } from '../constants';

async function deleteMarket(id, toggleNotification) {
  try {
    const data = await request(`/mktlng/markets/${id}`, { method: 'DELETE' });
    toggleNotification({ type: 'success', message: { id: getTrad('settings.markets.modal.delete.success') } });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return error;
  }
}

function useDeleteMarket() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const removeMarket = async id => {
    setLoading(true);
    await deleteMarket(id, toggleNotification);
    dispatch({ type: DELETE_MARKET, id });
    setLoading(false);
  };
  return { isDeleting: isLoading, deleteMarket: removeMarket };
}

export default useDeleteMarket;
