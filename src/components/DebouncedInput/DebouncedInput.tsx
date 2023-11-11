import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { useEffect, useState } from 'react';

type Props = {
  value: string;
  label: string;
  debounceMs?: number;
  onChange: (val: string) => void;
};

function DebouncedInput({
  value: initialValue,
  label,
  debounceMs = 500,
  onChange,
}: Props) {
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
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

DebouncedInput.defaultProps = {
  debounceMs: 500,
};

export default DebouncedInput;
