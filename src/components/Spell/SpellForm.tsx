import {
  RHFLazyMultiselect,
  RHFSelectField,
  RHFTextField,
} from '@components/Fields/RHF';
import { SPELL_LEVELS } from '@constants/spell';
import NewSpell from '@models/spell/NewSpell';
import Spell from '@models/spell/Spell';
import { Button, styled } from '@mui/material';
import { FormEventHandler } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import CastFields from './Sections/CastFields';
import SpellComponentFields from './Sections/SpellComponentFields';
import AoeFields from './Sections/AoeFields';
import RangeFields from './Sections/RangeFields';
import DurationFields from './Sections/DurationFields';

export type FormTypeSupport = NewSpell | Spell;

type Props = {
  control: Control<FormTypeSupport>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onValueChange: UseFormSetValue<FormTypeSupport>;
  watch: UseFormWatch<FormTypeSupport>;
};

const StyledForm = styled('form')(() => ({
  paddingBottom: '40px',
}));

function SpellForm({ control, onSubmit, onValueChange, watch }: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <section>
        <RHFTextField
          control={control}
          fieldName="name"
          label="Name"
          isRequired
        />
        <RHFSelectField
          control={control}
          fieldName="level"
          label="Level"
          options={SPELL_LEVELS}
        />
        <RHFLazyMultiselect
          control={control}
          fieldName="magicSchools"
          label="Magic Schools"
          isRequired
          queryArgs={{
            queryName: 'get_all_magic_schools',
            valueKey: 'id',
            textKey: 'name',
          }}
        />
        <RHFLazyMultiselect
          control={control}
          fieldName="classes"
          label="Classes"
          isRequired
          queryArgs={{
            queryName: 'get_all_classes',
            valueKey: 'id',
            textKey: 'name',
          }}
        />
      </section>
      <CastFields control={control} />
      <SpellComponentFields
        control={control}
        onValueChange={onValueChange}
        watch={watch}
      />
      <RangeFields
        control={control}
        onValueChange={onValueChange}
        watch={watch}
      />
      <DurationFields
        control={control}
        onValueChange={onValueChange}
        watch={watch}
      />
      <AoeFields
        control={control}
        onValueChange={onValueChange}
        watch={watch}
      />
      <section>
        {/* Description */}
        {/* Higher levels description */}
      </section>
      <section>{/* Damages */}</section>

      <div className="action-container">
        <Button
          variant="contained"
          disableElevation
          type="submit"
          className="right-align"
        >
          Save
        </Button>
      </div>
    </StyledForm>
  );
}

export default SpellForm;
