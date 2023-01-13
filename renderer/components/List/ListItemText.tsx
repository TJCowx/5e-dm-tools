import { ListItemText as MuiListItemText, styled } from '@mui/material';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

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

const ListItemText: FC<Props> = ({ primary, secondary, className }) => (
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

ListItemText.defaultProps = {
  secondary: undefined,
  className: undefined,
};

export default ListItemText;
