/* eslint-disable react/function-component-definition */
import { FormControlLabel, Slider, Switch } from '@mui/material';
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

function SwitchField<T>({ control, fieldName, label }: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Switch
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

export default SwitchField;
