import { styled, Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import { FC } from 'react';

const Container = styled('div')(({ theme }) => ({
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
  flexShrink: 1,
}));

type Props = {
  title: string;
};

const TitleBar: FC<Props> = ({ title }) => {
  const formattedTitle = `${title} | 5e DM Tools`;

  return (
    <Container
      className="title-bar"
      onDoubleClick={() => ipcRenderer.send('toggle-maximize-window')}
    >
      <Typography variant="caption">{formattedTitle}</Typography>
    </Container>
  );
};

export default TitleBar;
