import { styled } from '@mui/material';
import Creature from 'models/creature/Creature';
import { logMessage } from 'utils/logUtils';
import CreatureForm from 'components/Creature/CreatureForm';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertCreatureFormToDB } from 'utils/creatureUtils';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

const EditCreature: FC = () => {
  const router = useRouter();
  const { creatureId } = router.query;

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
        router.push('/creatures');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <Layout title={`Edit ${creature?.name ?? ''}`}>
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
    </Layout>
  );
};

export default EditCreature;
