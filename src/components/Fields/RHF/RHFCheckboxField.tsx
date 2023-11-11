/* eslint-disable react/function-component-definition */
import { Checkbox, FormControlLabel } from '@mui/material';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
};

function RHFCheckboxField<T extends FieldValues>({
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
