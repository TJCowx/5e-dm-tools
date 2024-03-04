import { Divider, Skeleton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';

interface Props {
  numOfItems?: number;
}

export default function SkeletonList({ numOfItems = 10 }: Props) {
  return (
    <List dense>
      {[...Array(numOfItems)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={`skel-${i}`}>
          <ListItem>
            <Skeleton sx={{ width: '100%' }} />
          </ListItem>
          <Divider component="li" />
        </Fragment>
      ))}
    </List>
  );
}
