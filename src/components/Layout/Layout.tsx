import { styled } from '@mui/material';
import clsx from 'clsx';
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
  '&:not(.no-padding)': {
    padding: '24px 16px 48px',
  },
}));

type Props = {
  disablePadding?: boolean;
};

function Layout({ disablePadding = false }: Props) {
  return (
    <Root>
      <NavDrawer />
      <ContentContainer
        className={clsx({
          'content-container': true,
          'no-padding': disablePadding,
        })}>
        <Outlet />
      </ContentContainer>
    </Root>
  );
}

export default Layout;
