/* eslint-disable react/function-component-definition */
import { TextField } from '@mui/material';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function AttributeField<T>({ control, fieldName, label }: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: 'This field is required',
        min: { value: 0, message: 'Must be greater than or equal to 0' },
        max: { value: 30, message: 'Must be less than or equal to 30' },
        pattern: {
          value: /[0-9]{2}/,
          message: 'Must be a whole value',
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type="number"
          className="attribute-field"
          label={label}
          InputProps={{ inputProps: { min: 0, max: 30 } }}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

export default AttributeField;
