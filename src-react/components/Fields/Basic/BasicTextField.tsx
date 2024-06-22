import { TextField } from '@mui/material';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Props = {
  id?: string;
  className?: string;
  label: string;
  value: string;
  error?: string | null;
  isMultiline?: boolean;
  autoFocus?: boolean;
  onChange: (newVal: string) => void;
  onBlur?: () => void;
};

const BasicTextField = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      className,
      label,
      value,
      error,
      isMultiline,
      autoFocus = false,
      onChange,
      onBlur,
    },
    ref,
  ) => (
    <TextField
      id={id}
      ref={ref}
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
      autoFocus={autoFocus}
      autoComplete="one-time-code" // disable autofill this way because chrome ignores autocomplete="off"
    />
  ),
);

BasicTextField.displayName = 'BasicTextField';

export default BasicTextField;
