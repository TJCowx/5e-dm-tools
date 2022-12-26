/* eslint-disable react/function-component-definition */
import clsx from 'clsx';
import { Control, Path, UnPackAsyncDefaultValues } from 'react-hook-form';

import IntegerField from './IntegerField';

type Props<T> = {
  className?: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function AttributeField<T>({ className, control, fieldName, label }: Props<T>) {
  return (
    <IntegerField
      className={clsx({ [`${className}`]: className })}
      fieldName={fieldName}
      control={control}
      label={label}
      min={0}
      max={30}
      isRequired
    />
  );
}

AttributeField.defaultProps = {
  className: undefined,
};

export default AttributeField;
