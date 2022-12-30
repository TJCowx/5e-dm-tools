/* eslint-disable import/prefer-default-export */
import { string as yupString } from 'yup';
import { RequireMessage } from './validationMessages';

export const yupStringRequired = (value: string) =>
  yupString().required(RequireMessage).validate(value);
