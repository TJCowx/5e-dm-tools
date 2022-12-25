/* eslint-disable react/function-component-definition */
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';

type Props<T> = {
  id: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
  options: { value: string | number; text: string }[];
};

function MultiselectField<T>({
  id,
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
        <FormControl className="form-multiselect" size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            {...field}
            labelId={id}
            label={label}
            error={fieldState.error != null}
            autoWidth={false}
            renderValue={(selected: Array<string | number>) =>
              selected.join(', ')
            }
            multiple
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

export default MultiselectField;
