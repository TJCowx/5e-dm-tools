import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@styles/globals.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Layout, LayoutProvider } from '@components/Layout';
import useTheme from '@hooks/useTheme';
import Creatures from '@pages/creatures';
import CreateCreature from '@pages/creatures/create';
import Home from '@pages/home';

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

function App() {
  const { theme } = useTheme();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <LayoutProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/creatures">
                <Route index element={<Creatures />} />
                <Route path="create" element={<CreateCreature />} />
              </Route>
            </Route>
          </Routes>
        </LayoutProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
