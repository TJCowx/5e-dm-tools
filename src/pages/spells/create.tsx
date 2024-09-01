import { addNewSpell } from '@api/spells';
import { NavBack } from '@components/Links';
import SpellForm, { FormTypeSupport } from '@components/Spell/SpellForm';
import useSetPagePadding from '@hooks/useSetPagePadding';
import NewSpell from '@models/spell/NewSpell';
import { Alert } from '@mui/material';
import { logMessage } from '@utils/loggingUtils';
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
  range: null,
  castTypeId: null,
  castTime: 1,
  aoeTypeId: null,
  aoeSize: null,
  durationTypeId: null,
  timeScaleId: null,
  duration: null,
  magicSchoolId: null,
};

function CreateSpell() {
  useSetPagePadding(true);
  const navigate = useNavigate();

  const { handleSubmit, control, watch, setValue } = useForm<FormTypeSupport>({
    defaultValues: DefaultValue,
  });
  const [hasError, setHasError] = useState(false);

  const onSubmit = (data: NewSpell) => {
    setHasError(false);
    addNewSpell(data)
      .then(() => {
        navigate('/spells');
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
      });
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
