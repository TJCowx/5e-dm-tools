import { updateSpell } from '@api/spells';
import { NavBack } from '@components/Links';
import { LoadingSpinner } from '@components/LoadingSpinner';
import SpellForm, { FormTypeSupport } from '@components/Spell/SpellForm';
import useInvoke from '@hooks/useInvoke';
import Spell from '@models/spell/Spell';
import { Alert, styled } from '@mui/material';
import { logMessage } from '@utils/loggingUtils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

function EditSpellPage() {
  const navigate = useNavigate();
  const { spellId } = useParams();

  const [hasError, setHasError] = useState(false);

  const { data, isLoading } = useInvoke<Spell>('get_editable_spell_by_id', {
    id: parseInt(spellId as string, 10),
  });

  const { handleSubmit, control, watch, reset, setValue } =
    useForm<FormTypeSupport>();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const onSubmit = (formData: FormTypeSupport) => {
    setHasError(false);
    updateSpell(formData as Spell)
      .then(() => {
        navigate('/spells');
      })
      .catch((err) => {
        logMessage('error', err);
        setHasError(true);
      });
  };

  return (
    <>
      <NavBack
        href="/spells"
        ariaLabel="Navigate to spells list"
        tooltipText="Back to spells list"
      />
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error saving your spell. Try again.
        </Alert>
      )}
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <SpellForm
          control={control}
          watch={watch}
          onValueChange={setValue}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </>
  );
}

export default EditSpellPage;
