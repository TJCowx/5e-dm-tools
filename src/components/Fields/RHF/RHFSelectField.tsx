/* eslint-disable react/function-component-definition */
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { v4 } from 'uuid';

import { RequireMessage } from 'utils/validationMessages';

export interface SelectOptions {
  value: string | number;
  text: string;
}

type Props<T extends FieldValues> = {
  id?: string;
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
  options: SelectOptions[];
  isRequired?: boolean;
  isLoading?: boolean;
  error?: string;
};

function RHFSelectField<T extends FieldValues>({
  id: idProp,
  control,
  className,
  fieldName,
  label,
  options,
  isRequired = false,
  isLoading = false,
  error,
}: Props<T>) {
  const id = useMemo(() => idProp ?? v4(), [idProp]);

  const rules = useMemo(
    () =>
      isRequired
        ? {
            required: RequireMessage,
            minLength: { value: 0, message: RequireMessage },
          }
        : undefined,
    [isRequired],
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
            MenuProps={{ PaperProps: { style: { maxHeight: '250px' } } }}
          >
            {options.map(({ value, text }) => (
              <MenuItem key={value} value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
          {isLoading && <CircularProgress size={20} />}
          {error && <FormHelperText error>{error}</FormHelperText>}
          {fieldState.error?.message && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default RHFSelectField;
