import { ListItemText as MuiListItemText } from '@mui/material';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type Props = {
  primary: string;
  secondary?: ReactNode;
  className?: string;
};

const ListItemText: FC<Props> = ({ primary, secondary, className }) => (
  <MuiListItemText
    className={clsx({ [`${className}`]: className })}
    primary={primary}
    secondary={secondary}
    primaryTypographyProps={{ variant: 'body1' }}
    secondaryTypographyProps={{
      variant: 'body2',
      color: 'rgba(0, 0, 0, 0.6)',
    }}
  />
);

ListItemText.defaultProps = {
  secondary: undefined,
  className: undefined,
};

export default ListItemText;
