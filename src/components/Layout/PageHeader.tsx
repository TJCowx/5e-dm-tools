import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { ReactNode } from 'react';

const TitleContainer = styled('div')(() => ({
  display: 'flex',
  '& .end-slot': { marginLeft: 'auto' },
}));

const HeaderDivider = styled(Divider)(() => ({
  marginTop: '8px',
  marginBottom: '16px',
  '&.top-only': { marginBottom: 0 },
}));

interface Props {
  title: string;
  topMarginOnly?: boolean;
  endSlotComponent?: ReactNode;
}

export default function PageHeader({
  title,
  endSlotComponent,
  topMarginOnly = false,
}: Props) {
  return (
    <>
      <TitleContainer>
        <Typography variant="h5">{title}</Typography>
        {!!endSlotComponent && (
          <div className="end-slot">{endSlotComponent}</div>
        )}
      </TitleContainer>
      <HeaderDivider className={clsx({ 'top-only': topMarginOnly })} />
    </>
  );
}
