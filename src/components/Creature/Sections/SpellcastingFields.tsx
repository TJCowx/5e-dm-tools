import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
  RHFIntegerField,
  RHFLazySelect,
  RHFSelectField,
} from '@components/Fields/RHF';
import { useEffect, useState } from 'react';
import { Divider, Paper, Typography, styled } from '@mui/material';
import Creature from '@models/creature/Creature';

type Props = {
  control: Control<Partial<Creature>>;
  onValueChange: UseFormSetValue<Partial<Creature>>;
  watch: UseFormWatch<Partial<Creature>>;
};

const FieldContainer = styled('div')(() => ({
  display: 'grid',
  columnGap: '12px',
  gridTemplateColumns: '3fr 1fr',
  maxWidth: '500px',
}));

const Container = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '40px',
  maxWidth: '1000px',
  '& .casting-type-wrapper': {
    padding: '16px',
  },
}));

export default function SpellcastingFields({
  control,
  onValueChange,
  watch,
}: Props) {
  const [showSpellcasting, setShowSpellcasting] = useState(false);
  const [showInnate, setShowInnage] = useState(false);

  const castingAbilityWatch = watch('');
  const innateAbilityWatch = watch('');

  useEffect(() => {}, [castingAbilityWatch]);

  useEffect(() => {}, [innateAbilityWatch]);

  return (
    <section>
      <Typography variant="h6">Spells</Typography>
      <Divider />
      <Container>
        <Paper className="casting-type-wrapper" elevation={1}>
          <div>
            <Typography variant="subtitle1">Spellcasting</Typography>
          </div>
          <Divider />
          <RHFSelectField
            control={control}
            fieldName="name"
            label="Spellcasting Ability"
            options={[]}
          />
          <div>
            <RHFIntegerField
              control={control}
              fieldName="name"
              label="Caster Level"
            />
            <RHFIntegerField
              control={control}
              fieldName="name"
              label="Save DC"
            />
            <RHFIntegerField
              control={control}
              fieldName="name"
              label="Spell Attack"
            />
          </div>
          <div>TODO: List Spells</div>
        </Paper>
        <Paper className="casting-type-wrapper">
          <Typography variant="subtitle1">Innate</Typography>
          <Divider />
          <RHFSelectField
            control={control}
            fieldName="name"
            label="Spellcasting Ability"
            options={[]}
          />
          <div>
            <RHFIntegerField
              control={control}
              fieldName="name"
              label="Save DC"
            />
            <RHFIntegerField
              control={control}
              fieldName="name"
              label="Spell Attack"
            />
          </div>
          <div>TODO: List spells</div>
        </Paper>
      </Container>
    </section>
  );
}
