import { Control } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import { RHFIntegerField, RHFLazySelect } from '@components/Fields/RHF';

type Props = {
  control: Control<FormTypeSupport>;
};

export default function CastFields({ control }: Props) {
  return (
    <section>
      <RHFIntegerField
        control={control}
        fieldName="castTime"
        label="Cast Time"
        min={1}
        max={99}
        isRequired
      />
      <RHFLazySelect
        control={control}
        fieldName="castTypeId"
        label="Cast Type"
        queryArgs={{
          queryName: 'get_all_cast_types',
          valueKey: 'id',
          textKey: 'name',
        }}
        isRequired
      />
    </section>
  );
}
