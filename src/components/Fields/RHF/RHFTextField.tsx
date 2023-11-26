/* eslint-disable react/function-component-definition */
import { TextField as MuiTextField } from '@mui/material';
import clsx from 'clsx';
import { RequireMessage } from 'constants/validationMessages';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

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
          autoComplete="off"
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
