import { NavBack } from '@components/Links';
import SpellForm from '@components/Spell/SpellForm';
import useSetPagePadding from '@hooks/useSetPagePadding';
import NewSpell from '@models/spell/NewSpell';
import Spell from '@models/spell/Spell';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const DefaultValue: NewSpell = {
  name: '',
  description: '',
  higherLevels: '',
  spellSlot: 0,
  requiresVerbal: false,
  requiresSomatic: false,
  requiresMaterial: false,
  level: 1,
  castingTime: '',
  canRitualCast: false,
  rangeTypeId: null,
  range: '',
  castTypeId: null,
  castTime: 1,
  aoeTypeId: null,
  aoeSize: null,
  durationTypeId: null,
  timeScaleId: null,
  duration: null,
  hitCount: null,
};

function CreateSpell() {
  useSetPagePadding(true);
  const navigate = useNavigate();

  const { handleSubmit, control, watch, setValue } = useForm<NewSpell>({
    defaultValues: DefaultValue,
  });
  const [hasError, setHasError] = useState(false);

  const onSubmit = (data: NewSpell) => {
    setHasError(false);
  };

  return (
    <>
      <NavBack
        href="/spells"
        ariaLabel="Go to spell list"
        tooltipText="Back to spells list"
      />
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error saving your spell. Try again.
        </Alert>
      )}
      <SpellForm
        control={control}
        watch={watch}
        onValueChange={setValue}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}

export default CreateSpell;
