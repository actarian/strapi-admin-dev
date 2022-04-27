import { useNotifyAT } from '@strapi/design-system/LiveRegions';
import { request, useNotification } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getTrad } from '../../utils';

async function fetchDefaultCountriesList(toggleNotification) {
  try {
    const data = await request('/mktlng/iso-countries', { method: 'GET' });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return [];
  }
}

function useDefaultCountries() {
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const toggleNotification = useNotification();
  const { isLoading, data } = useQuery('default-countries', () =>
    fetchDefaultCountriesList(toggleNotification).then(data => {
      notifyStatus(
        formatMessage({ id: getTrad('settings.countries.modal.countries.loaded'), defaultMessage: 'The countries have been successfully loaded.' })
      );
      return data;
    })
  );
  return { defaultCountries: data, isLoading };
}

export default useDefaultCountries;
