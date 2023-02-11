import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/form.css';
import 'styles/global.css';

import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline, styled } from '@mui/material';
import NavDrawer from 'components/Layout/NavDrawer';
import TitleBar from 'components/Layout/TitleBar';
import useTheme from 'hooks/useTheme';
import { FC } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ConnectPage from '../pages/connect/ConnectPage';
import CreateCreaturePage from '../pages/creatures/CreateCreaturePage';
import CreaturesPage from '../pages/creatures/CreaturesPage';
import EditCreaturePage from '../pages/creatures/EditCreaturePage';
import HomePage from '../pages/HomePage';
import InitiativePage from '../pages/initiative/InitiativePage';
import NotFoundPage from '../pages/NotFoundPage';
import SettingsPage from '../pages/settings/SettingsPage';

config.autoAddCss = false;

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  maxHeight: 'calc(100vh - 28px)',
  '& .content-wrapper': {
    width: '100%',
    maxHeight: 'calc(100vh - 28px)',
  },
}));

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/initiative" element={<InitiativePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/creatures">
        <Route index element={<CreaturesPage />} />
        <Route path="/create" element={<CreateCreaturePage />} />
        <Route path=":creatureId" element={<EditCreaturePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TitleBar />
        <PageWrapper>
          <NavDrawer />
          <div className="content-wrapper">
            <RouterProvider router={router} />
          </div>
        </PageWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
