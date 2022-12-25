/* eslint-disable react/function-component-definition */
import {
  Control,
  Controller,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';

type Props<T> = {
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function TextField<T>({ control, fieldName, label }: Props<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          label={label}
          error={fieldState.error != null}
          helperText={fieldState.error?.message}
          size="small"
        />
      )}
    />
  );
}

export default TextField;
