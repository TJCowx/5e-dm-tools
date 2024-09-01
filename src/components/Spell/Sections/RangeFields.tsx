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
import { Divider, Typography, styled } from '@mui/material';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

const FieldsContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 5fr',
  columnGap: '12px',
}));

export default function RangeFields({ control, onValueChange, watch }: Props) {
  const {
    data: rangeTypeRes,
    isLoading,
    error,
  } = useInvoke<RangeType[]>('get_all_range_types');
  const [typeOpts, setTypeOpts] = useState<SelectOptions[]>([]);
  const [requiresRange, setRequiresRange] = useState(false);

  const typeIdWatch = watch('rangeTypeId');

  useEffect(() => {
    if (rangeTypeRes && !isLoading && !error) {
      setTypeOpts(
        rangeTypeRes.map((d) => ({
          value: d.id,
          text: d.name,
        })),
      );
    }
  }, [rangeTypeRes]);

  useEffect(() => {
    if (typeIdWatch && rangeTypeRes) {
      const mappedType = rangeTypeRes.find((t) => t.id === typeIdWatch);

      if (mappedType) {
        setRequiresRange(mappedType.hasDefinedRange);
        if (!mappedType.hasDefinedRange) {
          onValueChange('range', null);
        }
      } else {
        logMessage('warn', `No matching range type found: ${typeIdWatch}`);
      }
    } else {
      onValueChange('range', null);
      setRequiresRange(false);
    }
  }, [typeIdWatch, rangeTypeRes]);

  return (
    <section>
      <Typography variant="h6">Range</Typography>
      <Divider />
      <FieldsContainer>
        <RHFIntegerField
          control={control}
          label="Range"
          fieldName="range"
          min={0}
          step={5}
          isRequired={requiresRange}
          disabled={!requiresRange}
        />
        <RHFSelectField
          control={control}
          isLoading={isLoading}
          error={error?.message}
          label="Range Type"
          fieldName="rangeTypeId"
          isRequired
          options={typeOpts}
        />
      </FieldsContainer>
    </section>
  );
}
