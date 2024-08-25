import { Control } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import { RHFIntegerField, RHFLazySelect } from '@components/Fields/RHF';
import { Divider, Typography, styled } from '@mui/material';

type Props = {
  control: Control<FormTypeSupport>;
};

const Section = styled('section')(() => ({
  '& .fields': {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    columnGap: '12px',
    maxWidth: '500px',
  },
}));

export default function CastFields({ control }: Props) {
  return (
    <Section>
      <Typography variant="h6">Casting</Typography>
      <Divider />
      <div className="fields">
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
      </div>
    </Section>
  );
}
