import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/system';
import clsx from 'clsx';
import { ipcRenderer } from 'electron';
import { FC, ReactNode } from 'react';

import NavDrawer from './NavDrawer';

type Props = {
  title: string;
  children: ReactNode;
  disablePadding?: boolean;
};

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .title-bar': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '28px',
    minHeight: '28px',
    userSelect: 'none',
    appRegion: 'drag',
    webkitAppRegion: 'drag',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    flexGrow: 0,
  },
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
    '&::-webkit-scrollbar-corner': {
      background: '#000',
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
  },
}));

const Layout: FC<Props> = ({ title, children, disablePadding }) => {
  const formattedTitle = `${title} | 5e DM Tools`;

  return (
    <Root>
      <div
        className="title-bar"
        onDoubleClick={() => ipcRenderer.send('toggle-maximize-window')}
      >
        <Typography variant="caption">{formattedTitle}</Typography>
      </div>
      <div className="page-wrapper">
        <NavDrawer />
        <Box
          className={clsx({
            'content-wrapper': true,
            'scroll-enabled': true,
            'no-padding': disablePadding,
          })}
        >
          <Container component="main">{children}</Container>
        </Box>
      </div>
    </Root>
  );
};

Layout.defaultProps = {
  disablePadding: false,
};

export default Layout;
