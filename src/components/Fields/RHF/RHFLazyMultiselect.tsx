import { useMemo } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import useInvoke from 'hooks/useInvoke';
import SelectQueryArgs from 'models/SelectQueryArgs';

import RHFMultiselectField from './RHFMultiselectField';
import { SelectOptions } from './RHFSelectField';

type Props<T extends FieldValues> = {
  id: string;
  className?: string;
  control: Control<T>;
  label: string;
  fieldName: FieldPath<T>;
  isRequired?: boolean;
  queryArgs: SelectQueryArgs;
};

function RHFLazyMultiselect<T extends FieldValues>({
  id,
  className,
  control,
  label,
  fieldName,
  isRequired,
  queryArgs,
  ...other
}: Props<T>) {
  const { data, isLoading, error } = useInvoke(queryArgs.queryName);

  const options: SelectOptions[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
      value: item[queryArgs.valueKey],
      text: `${item[queryArgs.textKey]}`,
    }));
  }, [data]);

  return (
    <RHFMultiselectField
      {...other}
      id={id}
      className={className}
      label={label}
      control={control}
      fieldName={fieldName}
      options={options}
      isLoading={isLoading}
      isRequired={isRequired}
      error={error?.message}
    />
  );
}

export default RHFLazyMultiselect;
