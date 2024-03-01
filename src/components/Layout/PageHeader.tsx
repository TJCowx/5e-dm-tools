import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ReactNode } from 'react';

const TitleContainer = styled('div')(() => ({
  display: 'flex',
  '& .end-slot': { marginLeft: 'auto' },
}));

const HeaderDivider = styled(Divider)(() => ({
  marginTop: '8px',
  marginBottom: '16px',
}));

interface Props {
  title: string;
  endSlotComponent?: ReactNode;
}

export default function PageHeader({ title, endSlotComponent }: Props) {
  return (
    <>
      <TitleContainer>
        <Typography variant="h5">{title}</Typography>
        {!!endSlotComponent && (
          <div className="end-slot">{endSlotComponent}</div>
        )}
      </TitleContainer>
      <HeaderDivider />
    </>
  );
}
