import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import NavDrawer from './NavDrawer';

const Root = styled('div')(() => ({
  height: '100%',
  maxHeight: '100%',
}));

const ContentContainer = styled('main')(() => ({
  marginLeft: '48px',
  overflow: 'auto',
  height: '100%',
}));

function Layout() {
  return (
    <Root>
      <NavDrawer />
      <ContentContainer className="content-container">
        <Outlet />
      </ContentContainer>
    </Root>
  );
}

export default Layout;
