import { useState, useEffect, useCallback } from 'react';

export const useWidgetData = (apiConfig) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    if (!apiConfig?.url) return;
    setLoading(true);
    try {
      const res = await fetch(apiConfig.url);
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Widget Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiConfig?.url]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(
      fetchData,
      (apiConfig.interval || 30) * 1000
    );

    return () => clearInterval(intervalId);
  }, [fetchData, apiConfig?.interval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
};
