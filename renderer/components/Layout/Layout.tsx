import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
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
  '& .content-wrapper': {
    display: 'flex',
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
      <div className="content-wrapper">
        <NavDrawer />
        <Container component="main">{children}</Container>
      </div>
    </Root>
  );
};

export default Layout;
