/* eslint-disable react/function-component-definition */
import clsx from 'clsx';
import { Control, Path, UnPackAsyncDefaultValues } from 'react-hook-form';

import RHFIntegerField from './RHFIntegerField';

type Props<T> = {
  className?: string;
  control: Control<T>;
  fieldName: Path<UnPackAsyncDefaultValues<T>>;
  label: string;
};

function RHFAttributeField<T>({
  className,
  control,
  fieldName,
  label,
}: Props<T>) {
  return (
    <RHFIntegerField
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

RHFAttributeField.defaultProps = {
  className: undefined,
};

export default RHFAttributeField;
