import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'styles/globals.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useTheme from 'hooks/useTheme';

import type { AppProps } from 'next/app';

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
