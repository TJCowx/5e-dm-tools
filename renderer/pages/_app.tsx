import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import useTheme from 'hooks/useTheme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import createCache from '@emotion/cache';

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
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
