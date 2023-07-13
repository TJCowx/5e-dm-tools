import { styled } from '@mui/material';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
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

const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  disablePadding = false,
}) => (
  <Root>
    <NavDrawer />
    <ContentContainer
      className={clsx({
        'content-container': true,
        'no-padding': disablePadding,
      })}
    >
      {children}
    </ContentContainer>
  </Root>
);

Layout.defaultProps = {
  disablePadding: false,
};

export default Layout;
