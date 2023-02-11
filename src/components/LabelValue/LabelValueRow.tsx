import { Typography } from '@mui/material';
import { FC } from 'react';

type Props = { label: string; value: string };

const LabelValueRow: FC<Props> = ({ label, value }) => (
  <Typography variant="body2">
    <Typography variant="subtitle2" component="span">
      {label}:
    </Typography>{' '}
    {value}
  </Typography>
);

export default LabelValueRow;
