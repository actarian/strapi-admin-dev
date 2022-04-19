import { useNotifyAT } from '@strapi/design-system/LiveRegions';
import { request, useNotification } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getTrad } from '../../utils';

const fetchDefaultMarketsList = async toggleNotification => {
  try {
    const data = await request('/mktlng/iso-markets', { method: 'GET' });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return [];
  }
};

const useDefaultMarkets = () => {
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const toggleNotification = useNotification();
  const { isLoading, data } = useQuery('default-markets', () =>
    fetchDefaultMarketsList(toggleNotification).then(data => {
      notifyStatus(
        formatMessage({ id: getTrad('settings.markets.modal.markets.loaded'), defaultMessage: 'The markets have been successfully loaded.' })
      );
      return data;
    })
  );
  return { defaultMarkets: data, isLoading };
};

export default useDefaultMarkets;
