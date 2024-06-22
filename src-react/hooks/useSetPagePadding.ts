import { useEffect } from 'react';

import { useLayout } from '@components/Layout';

export default function useSetPagePadding(shouldPad: boolean) {
  const { setShouldPadContainer } = useLayout();

  useEffect(() => {
    setShouldPadContainer(shouldPad);
  }, [shouldPad]);
}
