import useInvoke from 'hooks/useInvoke';
import SelectQueryArgs from 'models/SelectQueryArgs';
import { useEffect, useMemo } from 'react';

import { SelectOptions } from '../RHF/RHFSelectField';
import BasicSelectField from './BasicSelectField';

type Props = {
  id: string;
  className?: string;
  value: string | null;
  label: string;
  error?: string | null;
  queryArgs: SelectQueryArgs;
  queryParams?: Record<string, unknown>;
  onChange: (newVal: string) => void;
  onBlur?: () => void;
};

function LazySelectField({
  id,
  value,
  className,
  label,
  error: errorProp,
  queryArgs,
  queryParams,
  onChange,
  onBlur,
}: Props) {
  const { data, isLoading, error, invoke } = useInvoke(
    queryArgs.queryName,
    queryParams,
    false
  );

  useEffect(() => {
    invoke();
  }, [queryParams]);

  const options: SelectOptions[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
      value: item[queryArgs.valueKey],
      text: `${item[queryArgs.textKey]}`,
    }));
  }, [data]);

  return (
    <BasicSelectField
      id={id}
      value={value}
      className={className}
      label={label}
      error={error?.message || errorProp}
      options={options}
      isLoading={isLoading}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default LazySelectField;
