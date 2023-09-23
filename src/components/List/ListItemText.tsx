import { ListItemText as MuiListItemText, styled } from '@mui/material';
import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  primary: string;
  secondary?: ReactNode;
  className?: string;
};

const StyledListItem = styled(MuiListItemText)(({ theme }) => ({
  '& .secondary-text': {
    color: theme.palette.text.secondary,
  },
}));

function ListItemText({ primary, secondary, className }: Props) {
  return (
    <StyledListItem
      className={clsx({ [`${className}`]: className })}
      primary={primary}
      secondary={secondary}
      primaryTypographyProps={{ variant: 'body1' }}
      secondaryTypographyProps={{
        variant: 'body2',
        className: 'secondary-text',
      }}
    />
  );
}

export default ListItemText;
