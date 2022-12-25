/* eslint-disable react/function-component-definition */
import { TextField } from '@mui/material';
import { useMemo } from 'react';
import {
  Control,
  Controller,
  Path,
  RegisterOptions,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  min?: number;
  max?: number;
};

const createRules = (min: number | null, max: number | null) => {
  const rules: RegisterOptions = {
    pattern: {
      value: /[0-9]*/,
      message: 'Must be a whole value',
    },
  };

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

function IntegerField<T>({ control, fieldName, label, min, max }: Props<T>) {
  const rules = useMemo(() => createRules(min, max), [min, max]);

  const inputProps = useMemo(() => {
    if (min != null && max != null) return { inputProps: { min, max } };
    if (min != null && max == null) return { inputProps: { min } };
    if (max != null && min == null) return { inputProps: { max } };

    return undefined;
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
          label={label}
          InputProps={inputProps}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

IntegerField.defaultProps = {
  min: null,
  max: null,
};

export default IntegerField;
