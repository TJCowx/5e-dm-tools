import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

const BasicTextField: FC<TextFieldProps> = ({ ...props }) => (
  <TextField {...props} InputLabelProps={{ shrink: true }} size="small" />
);

export default BasicTextField;
