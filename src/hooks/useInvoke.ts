import { invoke as tauriInvoke } from '@tauri-apps/api';
import { useEffect, useState } from 'react';

export default function useInvoke<T>(
  query: string,
  queryArgs?: Record<string, unknown>,
  invokeOnMount = true
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  function invoke() {
    setIsLoading(true);
    tauriInvoke(query, queryArgs)
      .then((res) => {
        setData(res as T);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (invokeOnMount) {
      invoke();
    }
  }, []);

  return { isLoading, data, error, invoke };
}
