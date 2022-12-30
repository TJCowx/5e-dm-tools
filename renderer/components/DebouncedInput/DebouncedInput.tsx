import { InputAdornment, TextField } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { FC, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

type Props = {
  value: string;
  label: string;
  debounceMs?: number;
  onChange: (val: string) => void;
};

const DebouncedInput: FC<Props> = ({
  value: initialValue,
  label,
  debounceMs,
  onChange,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <TextField
      value={value}
      label={label}
      size="small"
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

DebouncedInput.defaultProps = {
  debounceMs: 500,
};

export default DebouncedInput;
