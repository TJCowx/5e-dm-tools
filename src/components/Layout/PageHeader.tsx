import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';

const HeaderDivider = styled(Divider)(() => ({
  marginTop: '8px',
  marginBottom: '16px',
}));

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <HeaderDivider />
    </>
  );
}
