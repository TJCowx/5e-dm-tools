import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/system';
import { ipcRenderer } from 'electron';
import { FC, ReactNode } from 'react';

import NavDrawer from './NavDrawer';

type Props = {
  title: string;
  children: ReactNode;
};

const Root = styled('div')(({ theme }) => ({
  '& .title-bar': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '28px',
    userSelect: 'none',
    appRegion: 'drag',
    webkitAppRegion: 'drag',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  '& .page-wrapper': {
    display: 'flex',
  },
  '& .content-wrapper': {
    width: '100%',
    maxHeight: 'calc(100vh - 28px)',
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
    maxWidth: '1200px',
  },
}));

const Layout: FC<Props> = ({ title, children }) => {
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
        <Box className="content-wrapper scroll-enabled">
          <Container component="main">{children}</Container>
        </Box>
      </div>
    </Root>
  );
};

export default Layout;
