import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import { RHFIntegerField, RHFLazySelect } from '@components/Fields/RHF';
import { useEffect } from 'react';
import { Divider, Typography, styled } from '@mui/material';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

const FieldContainer = styled('div')(() => ({
  display: 'grid',
  columnGap: '12px',
  gridTemplateColumns: '3fr 1fr',
  maxWidth: '500px',
}));

export default function AoeFields({ control, onValueChange, watch }: Props) {
  const aoeTypeWatch = watch('aoeTypeId');

  useEffect(() => {
    if (!aoeTypeWatch) {
      onValueChange('aoeSize', null);
    }
  }, [aoeTypeWatch]);

  return (
    <section>
      <Typography variant="h6">AOE</Typography>
      <Divider />
      <FieldContainer>
        <RHFLazySelect
          control={control}
          label="AOE Type"
          fieldName="aoeTypeId"
          queryArgs={{
            queryName: 'get_all_aoe_types',
            valueKey: 'id',
            textKey: 'name',
          }}
        />
        <RHFIntegerField
          control={control}
          label="AOE Size"
          fieldName="aoeSize"
          step={5}
          min={0}
          isRequired={aoeTypeWatch != null}
          disabled={aoeTypeWatch == null}
        />
      </FieldContainer>
    </section>
  );
}
