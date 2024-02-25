import { useCallback, useEffect, useState } from 'react';
import { gt } from 'semver';

import { logMessage } from 'utils/loggingUtils';

import useVersion from './useVersion';

export default function useNewestRelease() {
  const { version: currVer, loading: verLoading } = useVersion();
  const [loading, setLoading] = useState(false);
  const [newestVer, setNewestVer] = useState();
  const [htmlUrl, setHtmlUrl] = useState<string>();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const getLatest = useCallback(() => {
    setLoading(true);

    fetch('https://api.github.com/repos/tjcowx/5e-dm-tools/releases')
      .then((res) => res.json())
      .then((data) => {
        setNewestVer(data[0].tag_name);
        setHtmlUrl(data[0].html_url);
      })
      .catch((e) => {
        logMessage('error', e);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getLatest();
  }, []);

  useEffect(() => {
    if (newestVer && currVer && gt(newestVer, currVer)) {
      setIsUpdateAvailable(true);
    }
  }, [newestVer, currVer]);

  return {
    loading: loading || verLoading,
    version: newestVer,
    htmlUrl,
    currVer,
    isUpdateAvailable,
  };
}
