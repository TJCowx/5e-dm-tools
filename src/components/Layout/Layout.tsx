import { styled } from '@mui/material';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import NavDrawer from './NavDrawer';

import { useLayout } from '.';

const Root = styled('div')(() => ({
  height: '100%',
  maxHeight: '100%',
}));

const ContentContainer = styled('main')(() => ({
  marginLeft: '48px',
  overflow: 'auto',
  height: '100%',
  '&.content-padding': {
    padding: '24px 16px 48px',
  },
}));

function Layout() {
  const { shouldPadContainer } = useLayout();

  useEffect(() => {
    console.log('IN LAYOUT: ', shouldPadContainer);
  }, [shouldPadContainer]);

  return (
    <Root>
      <NavDrawer />
      <ContentContainer
        className={clsx({
          'content-container': true,
          'content-padding': shouldPadContainer,
        })}>
        <Outlet />
      </ContentContainer>
    </Root>
  );
}

export default Layout;
