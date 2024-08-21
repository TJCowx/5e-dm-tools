import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import {
  RHFIntegerField,
  RHFSelectField,
  SelectOptions,
} from '@components/Fields/RHF';
import useInvoke from '@hooks/useInvoke';
import { useEffect, useState } from 'react';
import { logMessage } from '@utils/loggingUtils';
import RangeType from '@models/spell/RangeType';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

export default function RangeFields({ control, onValueChange, watch }: Props) {
  const {
    data: castTypeRes,
    isLoading,
    error,
  } = useInvoke<RangeType[]>('get_all_range_types');
  const [typeOpts, setTypeOpts] = useState<SelectOptions[]>([]);
  const [requiresRange, setRequiresRange] = useState(false);

  const typeIdWatch = watch('rangeTypeId');
  const rangeWatch = watch('range');

  useEffect(() => {
    if (castTypeRes && !isLoading && !error) {
      setTypeOpts(
        castTypeRes.map((d) => ({
          value: d.id,
          text: d.name,
        })),
      );
    }
  }, [typeOpts]);

  useEffect(() => {
    if (typeIdWatch) {
      const mappedType = castTypeRes.find((t) => t.id === typeIdWatch);

      if (mappedType) {
        setRequiresRange(mappedType.hasDefinedRange);
        if (!mappedType.hasDefinedRange && rangeWatch != null) {
          onValueChange('range', null);
        }
      } else {
        logMessage('warn', `No matching range type found: ${typeIdWatch}`);
      }
    } else {
      onValueChange('range', null);
      setRequiresRange(false);
    }
  }, [typeIdWatch]);

  return (
    <section>
      <RHFSelectField
        control={control}
        isLoading={isLoading}
        error={error?.message}
        label="Range Type"
        fieldName="rangeTypeId"
        isRequired
        options={typeOpts}
      />
      <RHFIntegerField
        control={control}
        label="Range"
        fieldName="range"
        min={0}
        step={5}
        isRequired={requiresRange}
      />
    </section>
  );
}
