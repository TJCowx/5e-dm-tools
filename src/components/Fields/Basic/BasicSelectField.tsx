import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  id: string;
  className?: string;
  value: string | number | null;
  label: string;
  error?: string;
  options: { value: string | number; text: string }[];
  onChange: (newVal: string | number) => void;
  onBlur?: () => void;
};

const BasicSelectField: FC<Props> = ({
  id,
  value,
  className,
  label,
  error,
  options,
  onChange,
  onBlur,
}) => (
  <FormControl
    className={clsx({ 'form-select': true, [`${className}`]: className })}
    size="small"
  >
    <InputLabel id={id} shrink error={!!error?.length}>
      {label}
    </InputLabel>
    <Select
      labelId={id}
      value={value || ''}
      label={label}
      error={!!error?.length}
      autoWidth={false}
      notched
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      MenuProps={{ style: { maxHeight: '500px' } }}
    >
      {options.map(({ value: optVal, text }) => (
        <MenuItem key={optVal} value={optVal}>
          {text}
        </MenuItem>
      ))}
    </Select>
    {!!error?.length && <FormHelperText error>{error}</FormHelperText>}
  </FormControl>
);

BasicSelectField.defaultProps = {
  className: undefined,
  error: undefined,
  onBlur: undefined,
};

export default BasicSelectField;
