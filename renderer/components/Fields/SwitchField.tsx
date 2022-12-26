/* eslint-disable react/function-component-definition */
import { FormControlLabel, Switch } from '@mui/material';
import clsx from 'clsx';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  className?: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function SwitchField<T>({ className, control, fieldName, label }: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          className={clsx({ [`${className}`]: className })}
          control={
            <Switch
              {...field}
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
        />
      )}
    />
  );
}

SwitchField.defaultProps = {
  className: undefined,
};

export default SwitchField;
