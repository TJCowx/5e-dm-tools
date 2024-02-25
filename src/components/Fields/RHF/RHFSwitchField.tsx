import { FormControlLabel, Switch } from '@mui/material';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
};

function RHFSwitchField<T extends FieldValues>({
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

RHFSwitchField.defaultProps = {
  className: undefined,
};

export default RHFSwitchField;
