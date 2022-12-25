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
  isRequired?: boolean;
};

function TextField<T>({ control, fieldName, label, isRequired }: Props<T>) {
  const rules = isRequired ? { required: 'This field is required' } : undefined;

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
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

TextField.defaultProps = {
  isRequired: false,
};

export default TextField;
