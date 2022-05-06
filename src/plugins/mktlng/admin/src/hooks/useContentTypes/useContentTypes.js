import { request } from '@strapi/helper-plugin';
import { useEffect, useState } from 'react';

export default function useContentTypes() {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      loading ? null : setLoading(true);
      error ? setError(false) : null;
      try {
        const response = await request('/mktlng/content-types', { method: 'GET' });
        setResponse(response);
      } catch (error) {
        toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { contentTypes: response, loading, error, setError };
}
