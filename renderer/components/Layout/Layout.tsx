import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { ipcRenderer } from 'electron';
import Typography from '@mui/material/Typography';
import NavDrawer from './NavDrawer';

interface Props {
  title: string;
  children: ReactNode;
}

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
    '-webkit-app-region': 'drag',
  },
  '& .content-wrapper': {
    display: 'flex',
  },
  '& main': {
    margin: '12px',
    flexGrow: 1,
  },
}));

const Layout: FC<Props> = ({ title, children }) => {
  const formattedTitle = `${title} | 5e DM Tools`;

  return (
    <Root onDoubleClick={() => ipcRenderer.send('toggle-maximize-window')}>
      <div className="title-bar">
        <Typography variant="caption">{formattedTitle}</Typography>
      </div>
      <div className="content-wrapper">
        <NavDrawer />
        <main>{children}</main>
      </div>
    </Root>
  );
};

export default Layout;
