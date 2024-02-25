import { useMemo } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import useInvoke from 'hooks/useInvoke';
import SelectQueryArgs from 'models/SelectQueryArgs';

import RHFSelectField, { SelectOptions } from './RHFSelectField';

type Props<T extends FieldValues> = {
  id: string;
  className?: string;
  control: Control<T>;
  label: string;
  fieldName: FieldPath<T>;
  isRequired?: boolean;
  queryArgs: SelectQueryArgs;
};

function RHFLazySelect<T extends FieldValues>({
  id,
  control,
  className,
  fieldName,
  label,
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
    <RHFSelectField
      {...other}
      id={id}
      className={className}
      control={control}
      fieldName={fieldName}
      label={label}
      options={options}
      isLoading={isLoading}
      isRequired={isRequired}
      error={error?.message}
    />
  );
}

export default RHFLazySelect;
