import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/system';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import NavDrawer from './NavDrawer';
import TitleBar from './TitleBar';

type Props = {
  title: string;
  children: ReactNode;
  disablePadding?: boolean;
  contentFillPage?: boolean;
};

const Root = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .page-wrapper': {
    display: 'flex',
    flexGrow: 1,
    maxHeight: 'calc(100vh - 28px)',
  },
  '& .content-wrapper': {
    width: '100%',
    maxHeight: 'calc(100vh - 28px)',
    paddingTop: '20px',
    '&.no-padding': { padding: 0, '& main': { margin: 0, padding: 0 } },
  },
  '& .scroll-enabled': {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '16px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: '12px',
      border: '4px solid transparent',
      backgroundClip: 'content-box',
      minWidth: '16px',
      minHeigh: '16px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
  '& main': {
    height: '100%',
    maxHeight: '100%',
    '&.fill-page': { maxWidth: 'unset' },
  },
}));

const Layout: FC<Props> = ({
  title,
  children,
  disablePadding,
  contentFillPage,
}) => {
  return (
    <Root>
      <TitleBar title={title} />
      <div className="page-wrapper">
        <NavDrawer />
        <Box
          className={clsx({
            'content-wrapper': true,
            'scroll-enabled': true,
            'no-padding': disablePadding,
          })}
        >
          <Container
            component="main"
            className={clsx({ 'fill-page': contentFillPage })}
          >
            {children}
          </Container>
        </Box>
      </div>
    </Root>
  );
};

Layout.defaultProps = {
  disablePadding: false,
  contentFillPage: false,
};

export default Layout;
