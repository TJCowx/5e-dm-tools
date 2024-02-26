import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import ListItemText from '@components/List/ListItemText';
import { RequireMessage } from '@constants/validationMessages';

import { SelectOptions } from './RHFSelectField';

type Props<T extends FieldValues> = {
  id: string;
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
  options: SelectOptions[];
  isRequired?: boolean;
  isLoading?: boolean;
  error?: string;
};

function RHFMultiselectField<T extends FieldValues>({
  id,
  className,
  control,
  fieldName,
  label,
  options,
  isRequired = false,
  isLoading = false,
  error,
}: Props<T>) {
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

  const formatDisplayValue = useCallback(
    (selected: Array<string | number>) =>
      options.reduce((acc, { value, text }) => {
        if (selected.indexOf(value) > -1) {
          return acc.length > 0 ? `${acc}, ${text}` : text;
        }
        return acc;
      }, ''),
    [options],
  );

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl
          className={clsx({
            'form-multiselect': true,
            [`${className}`]: className,
          })}
          size="small">
          <InputLabel id={id} shrink>
            {label}
          </InputLabel>
          <Select
            {...field}
            value={field.value || []}
            labelId={id}
            label={label}
            error={fieldState.error != null}
            autoWidth={false}
            renderValue={(selected: Array<string | number>) =>
              formatDisplayValue(selected)
            }
            multiple
            notched
            MenuProps={{ PaperProps: { style: { maxHeight: '250px' } } }}>
            {options.map(({ value, text }) => (
              <MenuItem key={value} value={value} dense>
                <Checkbox
                  checked={
                    (field.value as Array<string | number>)?.indexOf(value) > -1
                  }
                />
                <ListItemText primary={text} />
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

RHFMultiselectField.defaultProps = {
  className: undefined,
};

export default RHFMultiselectField;
