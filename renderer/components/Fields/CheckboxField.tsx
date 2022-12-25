/* eslint-disable react/function-component-definition */
import { Checkbox, FormControlLabel } from '@mui/material';
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

function CheckboxField<T>({ control, fieldName, label }: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
        />
      )}
    />
  );
}

export default CheckboxField;
