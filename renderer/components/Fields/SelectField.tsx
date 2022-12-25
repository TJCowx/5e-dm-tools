/* eslint-disable react/function-component-definition */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useMemo } from 'react';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  id: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  options: { value: string | number; text: string }[];
  isRequired?: boolean;
};

function SelectField<T>({
  id,
  control,
  fieldName,
  label,
  options,
  isRequired,
}: Props<T>) {
  const rules = useMemo(
    () => (isRequired ? { required: 'This field is required' } : undefined),
    [isRequired]
  );

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl className="form-select" size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            {...field}
            labelId={id}
            label={label}
            error={fieldState.error != null}
            autoWidth={false}
          >
            {options.map(({ value, text }) => (
              <MenuItem key={value} value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error?.message && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

SelectField.defaultProps = {
  isRequired: false,
};

export default SelectField;
