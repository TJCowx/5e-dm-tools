import { makeStyles } from 'tss-react/mui';
import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { ipcRenderer } from 'electron';

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
  },
}));

const Layout: FC<Props> = ({ title, children }) => {
  const formattedTitle = `${title} | 5e DM Tools`;

  return (
    <Root onDoubleClick={() => ipcRenderer.send('toggle-maximize-window')}>
      <div className="title-bar">{formattedTitle}</div>
      <div>
        <div>Nav drawer</div>
        <div>{children}</div>
      </div>
    </Root>
  );
};

export default Layout;
