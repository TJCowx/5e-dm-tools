import {
  RHFLazyMultiselect,
  RHFLazySelect,
  RHFSelectField,
  RHFTextField,
} from '@components/Fields/RHF';
import { SPELL_LEVELS } from '@constants/spell';
import NewSpell from '@models/spell/NewSpell';
import Spell from '@models/spell/Spell';
import { Button, Divider, Typography, styled } from '@mui/material';
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
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  paddingBottom: '40px',
  '& hr': { margin: '8px 0 16px' },
  '& .metadata-row': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    '& .metadata-name': {
      display: 'grid',
      columnGap: '12px',
      gridTemplateColumns: '2fr 1fr',
      maxWidth: '850px',
    },
    '& .metadata-assignments': {
      display: 'grid',
      columnGap: '12px',
      gridTemplateColumns: '1fr 3fr 3fr',
      maxWidth: '850px',
    },
  },
  '& .description-container': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    maxWidth: '650px',
  },
}));

function SpellForm({ control, onSubmit, onValueChange, watch }: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <section>
        <Typography variant="h6">Metadata</Typography>
        <Divider />
        <div className="metadata-row">
          <div className="metadata-name">
            <RHFTextField
              control={control}
              fieldName="name"
              label="Name"
              isRequired
            />
            <RHFLazySelect
              control={control}
              fieldName="sourceAbbr"
              allowNone
              label="Source"
              queryArgs={{
                queryName: 'get_all_sources',
                valueKey: 'abbreviation',
                textKey: 'name',
              }}
            />
          </div>
          <div className="metadata-assignments">
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
          </div>
        </div>
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
        <Typography variant="h6">Metadata</Typography>
        <Divider />
        <div className="description-container">
          <RHFTextField
            control={control}
            fieldName="description"
            label="Description"
            isMultiline
            rows={2}
          />
          <RHFTextField
            control={control}
            fieldName="higherLevels"
            label="At higher levels"
          />
        </div>
      </section>
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
