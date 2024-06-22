import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

export default styled(ListItem)(() => ({
  paddingRight: '96px',
  '& .MuiListItemSecondaryAction-root > *:first-of-type': {
    marginRight: '4px',
  },
}));
