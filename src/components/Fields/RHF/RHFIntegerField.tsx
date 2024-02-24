/* eslint-disable react/function-component-definition */
import { TextField } from '@mui/material';
import clsx from 'clsx';
import { useMemo } from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { RequireMessage } from 'utils/validationMessages';

type Props<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
  min?: number | null;
  max?: number | null;
  isRequired?: boolean;
  step?: number;
};

const createRules = (
  min: number | null,
  max: number | null,
  isRequired = false,
) => {
  const rules: RegisterOptions = {
    pattern: {
      value: /[0-9]*/,
      message: 'Must be a whole value',
    },
  };

  if (isRequired) rules.required = RequireMessage;

  if (min != null) {
    rules.min = {
      value: min,
      message: `Must be greater than or equal to ${min}`,
    };
  }

  if (max != null) {
    rules.max = {
      value: max,
      message: `Must be less than or equal to ${max}`,
    };
  }

  return rules;
};

function RHFIntegerField<T extends FieldValues>({
  className,
  control,
  fieldName,
  label,
  min = null,
  max = null,
  isRequired = false,
  step = 1,
}: Props<T>) {
  const rules = useMemo(
    () => createRules(min, max, isRequired),
    [min, max, isRequired],
  );

  const inputProps = useMemo(() => {
    if (min != null && max != null) return { inputProps: { min, max, step } };
    if (min != null && max == null) return { inputProps: { min, step } };
    if (max != null && min == null) return { inputProps: { max, step } };

    return { inputProps: { step } };
  }, [min, max]);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type="number"
          className={clsx({
            'integer-field': true,
            [`${className}`]: className,
          })}
          label={label}
          InputProps={inputProps}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      )}
    />
  );
}

RHFIntegerField.defaultProps = {
  min: null,
  max: null,
  isRequired: false,
  className: undefined,
};

export default RHFIntegerField;
