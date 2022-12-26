import { ListItemText as MuiListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  primary: string;
  secondary?: ReactNode;
};

const ListItemText: FC<Props> = ({ primary, secondary }) => (
  <MuiListItemText
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
};

export default ListItemText;
