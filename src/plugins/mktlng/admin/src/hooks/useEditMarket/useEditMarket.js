import { request, useNotification } from '@strapi/helper-plugin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrad } from '../../utils';
import { UPDATE_MARKET } from '../constants';

async function editMarket(id, payload, toggleNotification) {
  try {
    const data = await request(`/mktlng/markets/${id}`, { method: 'PUT', body: payload });
    toggleNotification({ type: 'success', message: { id: getTrad('settings.markets.modal.edit.success') } });
    return data;
  } catch {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return null;
  }
}

function useEditMarket() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const modifyMarket = async (id, payload) => {
    setLoading(true);
    const editedMarket = await editMarket(id, payload, toggleNotification);
    dispatch({ type: UPDATE_MARKET, editedMarket });
    setLoading(false);
  };
  return { isEditing: isLoading, editMarket: modifyMarket };
}

export default useEditMarket;
