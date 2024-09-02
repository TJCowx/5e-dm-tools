import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';
import { RHFCheckboxField, RHFTextField } from '@components/Fields/RHF';
import { Divider, Typography, styled } from '@mui/material';
import { useEffect } from 'react';

type Props = {
  control: Control<FormTypeSupport>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

const Section = styled('section')(() => ({}));

export default function SpellComponentFields({
  control,
  watch,
  onValueChange,
}: Props) {
  const reqMatWatch = watch('requiresMaterial');

  useEffect(() => {
    console.log(reqMatWatch);
    if (!reqMatWatch) {
      onValueChange('materialComponents', '');
    }
  }, [reqMatWatch]);

  return (
    <Section>
      <Typography variant="h6">Components</Typography>
      <Divider />
      <div>
        <RHFCheckboxField
          control={control}
          label="Verbal"
          fieldName="requiresVerbal"
        />
        <RHFCheckboxField
          control={control}
          label="Somatic"
          fieldName="requiresSomatic"
        />
        <RHFCheckboxField
          control={control}
          label="Material"
          fieldName="requiresMaterial"
        />
        <RHFTextField
          control={control}
          label="Material Components"
          fieldName="materialComponents"
          disabled={!reqMatWatch}
        />
      </div>
    </Section>
  );
}
