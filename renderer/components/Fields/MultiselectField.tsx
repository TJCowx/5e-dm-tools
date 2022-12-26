/* eslint-disable react/function-component-definition */
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import ListItemText from 'components/List/ListItemText';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  id: string;
  className?: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  options: { value: string | number; text: string }[];
};

function MultiselectField<T>({
  id,
  className,
  control,
  fieldName,
  label,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormControl
          className={clsx({
            'form-multiselect': true,
            [`${className}`]: className,
          })}
          size="small"
        >
          <InputLabel id={id} shrink>
            {label}
          </InputLabel>
          <Select
            {...field}
            value={field.value || ''}
            labelId={id}
            label={label}
            error={fieldState.error != null}
            autoWidth={false}
            renderValue={(selected: Array<string | number>) =>
              selected.join(', ')
            }
            multiple
            notched
          >
            {options.map(({ value, text }) => (
              <MenuItem key={value} value={value} dense>
                <Checkbox
                  checked={
                    (field.value as Array<string | number>).indexOf(value) > -1
                  }
                />
                <ListItemText primary={text} />
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

MultiselectField.defaultProps = {
  className: undefined,
};

export default MultiselectField;
