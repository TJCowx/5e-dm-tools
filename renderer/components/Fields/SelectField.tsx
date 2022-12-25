/* eslint-disable react/function-component-definition */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
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
};

function SelectField<T>({ id, control, fieldName, label, options }: Props<T>) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormControl>
          <InputLabel id={id}>{label}</InputLabel>
          <Select {...field} label={label} error={fieldState.error != null}>
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

export default SelectField;
