/* eslint-disable react/function-component-definition */
import clsx from 'clsx';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import RHFIntegerField from './RHFIntegerField';

type Props<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  fieldName: FieldPath<T>;
  label: string;
};

function RHFAttributeField<T extends FieldValues>({
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
