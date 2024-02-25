import { getVersion } from '@tauri-apps/api/app';
import { useEffect, useState } from 'react';

/**
 * Get the version of the
 */
export default function useVersion() {
  const [version, setVersion] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVersion()
      .then((res) => setVersion(res))
      .finally(() => setLoading(false));
  }, []);

  return { version, loading };
}
