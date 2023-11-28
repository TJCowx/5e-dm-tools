import { TextField } from '@mui/material';
import clsx from 'clsx';

type Props = {
  id?: string;
  className?: string;
  label: string;
  value: string;
  error?: string | null;
  isMultiline?: boolean;
  onChange: (newVal: string) => void;
  onBlur?: () => void;
};

function BasicTextField({
  id,
  className,
  label,
  value,
  error,
  isMultiline,
  onChange,
  onBlur,
}: Props) {
  return (
    <TextField
      id={id}
      className={clsx({ [`${className}`]: className })}
      value={value || ''}
      InputLabelProps={{ shrink: true }}
      size="small"
      label={label}
      error={!!error?.length}
      helperText={error}
      multiline={isMultiline}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      autoComplete="one-time-code" // disable autofill this way because chrome ignores autocomplete="off"
    />
  );
}

export default BasicTextField;
