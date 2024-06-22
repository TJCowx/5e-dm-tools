import { TextField as MuiTextField } from '@mui/material';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { RequireMessage } from '@constants/validationMessages';

type Props<T extends FieldValues> = {
  id?: string;
  control: Control<T>;
  className?: string;
  fieldName: FieldPath<T>;
  label: string;
  isRequired?: boolean;
  isMultiline?: boolean;
};

function RHFTextField<T extends FieldValues>({
  id,
  control,
  className,
  fieldName,
  label,
  isRequired,
  isMultiline,
}: Props<T>) {
  const rules = isRequired
    ? {
        required: RequireMessage,
        minLength: { value: 0, message: RequireMessage },
      }
    : undefined;

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          id={id}
          className={clsx({ [`${className}`]: className })}
          label={label}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          size="small"
          multiline={isMultiline}
          autoComplete="one-time-code" // disable autofill this way because chrome ignores autocomplete="off"
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

RHFTextField.defaultProps = {
  id: undefined,
  isRequired: false,
  isMultiline: false,
  className: undefined,
};

export default RHFTextField;
