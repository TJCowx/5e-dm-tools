/* eslint-disable react/function-component-definition */
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import clsx from 'clsx';

type Props<T> = {
  control: Control<T>;
  className?: string;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  isRequired?: boolean;
  isMultiline?: boolean;
};

function TextField<T>({
  control,
  className,
  fieldName,
  label,
  isRequired,
  isMultiline,
}: Props<T>) {
  const rules = isRequired ? { required: 'This field is required' } : undefined;

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          className={clsx({ [`${className}`]: className })}
          label={label}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          size="small"
          multiline={isMultiline}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

TextField.defaultProps = {
  isRequired: false,
  isMultiline: false,
  className: undefined,
};

export default TextField;
