import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import { RHFIntegerField, RHFLazySelect } from '@components/Fields/RHF';
import { useEffect } from 'react';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

export default function AoeFields({ control, onValueChange, watch }: Props) {
  const aoeTypeWatch = watch('aoeTypeId');

  useEffect(() => {
    if (!aoeTypeWatch) {
      onValueChange('aoeSize', null);
    }
  }, [aoeTypeWatch]);

  return (
    <section>
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
    </section>
  );
}
