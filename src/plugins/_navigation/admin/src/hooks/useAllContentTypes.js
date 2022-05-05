import { useNotification } from '@strapi/helper-plugin';
import { useQuery } from 'react-query';
import { fetchAllContentTypes } from '../utils/api';

const useAllContentTypes = () => {
  const toggleNotification = useNotification();
  const { isLoading, data } = useQuery('contentTypes', () =>
    fetchAllContentTypes(toggleNotification)
  );
  return { data, isLoading, };
};

export default useAllContentTypes;
