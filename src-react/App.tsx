import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@styles/globals.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout, LayoutProvider } from '@components/Layout';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { SuspenseElement } from '@components/Routing';
import useTheme from '@hooks/useTheme';

const Creatures = lazy(() => import('@pages/creatures/index'));
const CreateCreature = lazy(() => import('@pages/creatures/create'));
const EditCreature = lazy(() => import('@pages/creatures/edit'));
const Home = lazy(() => import('@pages/home/index'));
const InitiativePage = lazy(() => import('@pages/initiative/index'));
const SettingsPage = lazy(() => import('@pages/settings/index'));
const SourcesPage = lazy(() => import('@pages/sources/index'));

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
              <Route index element={<SuspenseElement element={<Home />} />} />
              <Route path="/creatures">
                <Route
                  index
                  element={<SuspenseElement element={<Creatures />} />}
                />
                <Route
                  path="create"
                  element={<SuspenseElement element={<CreateCreature />} />}
                />
                <Route
                  path="edit/:creatureId"
                  element={<SuspenseElement element={<EditCreature />} />}
                />
              </Route>
              <Route
                path="/initiative"
                element={<SuspenseElement element={<InitiativePage />} />}
              />
              <Route
                path="/settings"
                element={<SuspenseElement element={<SettingsPage />} />}
              />
              <Route
                path="/sources"
                element={<SuspenseElement element={<SourcesPage />} />}
              />
              <Route
                path="/loading"
                element={
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <LoadingSpinner />
                  </div>
                }
              />
            </Route>
          </Routes>
        </LayoutProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
