import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { ipcRenderer } from 'electron';
import Typography from '@mui/material/Typography';
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
  },
  '& .content-wrapper': {
    display: 'flex',
  },
  '& main': {
    margin: '12px 16px',
    flexGrow: 1,
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
        <main>{children}</main>
      </div>
    </Root>
  );
};

export default Layout;
