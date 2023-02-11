import { styled } from '@mui/material';
import CreatureForm from 'components/Creature/CreatureForm';
import NavBack from 'components/Links/NavBack';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import useDocumentTitle from 'hooks/useDocumentTitle';
import Creature from 'models/creature/Creature';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { convertCreatureFormToDB } from 'utils/creatureUtils';
import { logMessage } from 'utils/logUtils';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

const EditCreaturePage: FC = () => {
  useDocumentTitle('Edit Monster');
  const navigate = useNavigate();
  const { creatureId } = useParams();

  useConfirmBeforeExitPage();

  const [creature, setCreature] = useState<Creature>();
  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit, control, watch, reset } = useForm<Creature>({
    defaultValues: creature,
  });

  useEffect(() => {
    fetch(`/creatures/${creatureId}`, { method: 'GET' }).then(async (res) => {
      const parsedRes = await res.json();
      reset(parsedRes.data);
      setCreature(parsedRes.data);
      setIsLoading(false);
    });
  }, []);

  const onSubmit = (data: Creature) => {
    fetch(`/creatures/${creature.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertCreatureFormToDB(data)),
    })
      .then(() => {
        navigate('/creatures');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <div>
      <NavBack
        href="/creatures"
        ariaLabel="Navigate to creature list"
        tooltipText="Back to creatures list"
      />
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <CreatureForm
          control={control}
          watch={watch}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </div>
  );
};

export default EditCreaturePage;
