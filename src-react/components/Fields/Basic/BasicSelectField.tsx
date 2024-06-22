import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';

import { SelectOptions } from '../RHF';

type Props = {
  id: string;
  className?: string;
  value: string | null;
  label: string;
  error?: string | null;
  options: SelectOptions[];
  isLoading?: boolean;
  onChange: (newVal: string) => void;
  onBlur?: () => void;
};

function BasicSelectField({
  id,
  value,
  className,
  label,
  error,
  options,
  isLoading = false,
  onChange,
  onBlur,
}: Props) {
  return (
    <FormControl
      className={clsx({ 'form-select': true, [`${className}`]: className })}
      size="small">
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
        MenuProps={{ style: { maxHeight: '500px' } }}>
        {options.map(({ value: optVal, text }) => (
          <MenuItem key={optVal} value={optVal}>
            {text}
          </MenuItem>
        ))}
      </Select>
      {isLoading && <CircularProgress size={20} />}
      {!!error?.length && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

export default BasicSelectField;
