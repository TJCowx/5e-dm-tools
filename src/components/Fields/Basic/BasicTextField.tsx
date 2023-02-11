import { TextField } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  id?: string;
  className?: string;
  label: string;
  value: string;
  error?: string;
  isMultiline?: boolean;
  onChange: (newVal: string) => void;
  onBlur?: () => void;
};

const BasicTextField: FC<Props> = ({
  id,
  className,
  label,
  value,
  error,
  isMultiline,
  onChange,
  onBlur,
}) => (
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
  />
);

BasicTextField.defaultProps = {
  id: undefined,
  className: undefined,
  error: undefined,
  isMultiline: false,
  onBlur: undefined,
};

export default BasicTextField;
