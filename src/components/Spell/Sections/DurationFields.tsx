import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import useInvoke from '@hooks/useInvoke';
import {
  RHFIntegerField,
  RHFLazySelect,
  RHFSelectField,
  SelectOptions,
} from '@components/Fields/RHF';
import { useEffect, useState } from 'react';
import DurationType from '@models/spell/DurationType';
import { Divider, Typography, styled } from '@mui/material';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

const FieldsContainer = styled('div')(({}) => ({
  display: 'grid',
  columnGap: '12px',
  gridTemplateColumns: '2fr 1fr 2fr',
  maxWidth: '750px',
}));

export default function DurationFields({
  control,
  onValueChange,
  watch,
}: Props) {
  const {
    data: durationTypes,
    isLoading,
    error,
  } = useInvoke<DurationType[]>('get_all_duration_types');
  const [typeOpts, setTypeOpts] = useState<SelectOptions[]>([]);
  const [needsTimeScale, setNeedsTimeScale] = useState(false);

  const durationTypeWatch = watch('durationTypeId');

  useEffect(() => {
    if (durationTypes && !isLoading && !error) {
      setTypeOpts(durationTypes.map((t) => ({ value: t.id, text: t.name })));
    }
  }, [durationTypes, isLoading, error]);

  useEffect(() => {
    if (durationTypeWatch != null && durationTypes) {
      const durationType = durationTypes.find(
        (t) => t.id === durationTypeWatch,
      );

      const needsScale = durationType.hasTimeScale;

      setNeedsTimeScale(needsScale);
      if (!needsScale) {
        onValueChange('duration', null);
        onValueChange('timeScaleId', null);
      }
    } else {
      setNeedsTimeScale(false);
      onValueChange('duration', null);
      onValueChange('timeScaleId', null);
    }
  }, [durationTypeWatch, durationTypes]);

  return (
    <section>
      <Typography variant="h6">Duration</Typography>
      <Divider />
      <FieldsContainer>
        <RHFSelectField
          control={control}
          fieldName="durationTypeId"
          label="Duration Type"
          options={typeOpts}
          isRequired
          isLoading={isLoading}
          error={error?.message}
        />
        <RHFIntegerField
          control={control}
          fieldName="duration"
          label="Duration"
          min={0}
          disabled={!needsTimeScale}
          isRequired={needsTimeScale}
        />
        <RHFLazySelect
          control={control}
          fieldName="timeScaleId"
          label="Time Scale"
          disabled={!needsTimeScale}
          isRequired={needsTimeScale}
          queryArgs={{
            queryName: 'get_all_time_scales',
            valueKey: 'id',
            textKey: 'name',
          }}
        />
      </FieldsContainer>
    </section>
  );
}
