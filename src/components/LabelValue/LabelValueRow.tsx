import { Typography } from '@mui/material';

type Props = { label: string; value: string };

function LabelValueRow({ label, value }: Props) {
  return (
    <Typography variant="body2">
      <Typography variant="subtitle2" component="span">
        {label}:
      </Typography>{' '}
      {value}
    </Typography>
  );
}

export default LabelValueRow;
