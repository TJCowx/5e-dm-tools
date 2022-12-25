/* eslint-disable react/function-component-definition */
import { Control, Path, UnPackAsyncDefaultValues } from 'react-hook-form';

import IntegerField from './IntegerField';

type Props<T> = {
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function AttributeField<T>({ control, fieldName, label }: Props<T>) {
  return (
    <IntegerField
      fieldName={fieldName}
      control={control}
      label={label}
      min={0}
      max={30}
      isRequired
    />
  );
}

export default AttributeField;
