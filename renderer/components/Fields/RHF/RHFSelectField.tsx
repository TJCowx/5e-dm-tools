/* eslint-disable react/function-component-definition */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import { useMemo } from 'react';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { RequireMessage } from 'utils/validationMessages';

type Props<T> = {
  id: string;
  className?: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  options: { value: string | number; text: string }[];
  isRequired?: boolean;
};

function RHFSelectField<T>({
  id,
  control,
  className,
  fieldName,
  label,
  options,
  isRequired,
}: Props<T>) {
  const rules = useMemo(
    () =>
      isRequired
        ? {
            required: RequireMessage,
            minLength: { value: 0, message: RequireMessage },
          }
        : undefined,
    [isRequired]
  );

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl
          className={clsx({ 'form-select': true, [`${className}`]: className })}
          size="small"
        >
          <InputLabel id={id} shrink error={fieldState.error != null}>
            {label}
          </InputLabel>
          <Select
            {...field}
            labelId={id}
            label={label}
            value={field.value || ''}
            error={fieldState.error != null}
            autoWidth={false}
            notched
          >
            {options.map(({ value, text }) => (
              <MenuItem key={value} value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error?.message && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

RHFSelectField.defaultProps = {
  isRequired: false,
  className: undefined,
};

export default RHFSelectField;
