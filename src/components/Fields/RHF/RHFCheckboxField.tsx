/* eslint-disable react/function-component-definition */
import { Checkbox, FormControlLabel } from '@mui/material';
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

function RHFCheckboxField<T>({
  className,
  control,
  fieldName,
  label,
}: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          className={clsx({ [`${className}`]: className })}
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

RHFCheckboxField.defaultProps = {
  className: undefined,
};

export default RHFCheckboxField;
