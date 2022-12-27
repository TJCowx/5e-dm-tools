import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'styles/global.css';
import 'styles/form.css';

import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import useTheme from 'hooks/useTheme';
import { AppProps } from 'next/app';
import Head from 'next/head';

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const { theme } = useTheme();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
