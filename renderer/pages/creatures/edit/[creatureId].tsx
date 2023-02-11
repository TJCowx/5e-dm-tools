import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import CreatureForm from 'components/Creature/CreatureForm';
import dbConnect from 'db/dbConnect';
import Creature, { CreatureModel } from 'models/creature/Creature';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';
import { convertCreatureFormToDB, mapCreatureDoc } from 'utils/creatureUtils';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { styled } from '@mui/material';

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

  const [creature, setCreature] = useState<CreatureModel>();
  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit, control, watch, reset } = useForm<CreatureModel>({
    defaultValues: creature,
  });

  useEffect(() => {
    fetch(`/api/creatures/${creatureId}`, { method: 'GET' }).then(
      async (res) => {
        const parsedRes = await res.json();
        reset(parsedRes.data);
        setCreature(parsedRes.data);
        // setIsLoading(false);
      }
    );
  }, []);

  const onSubmit = (data: CreatureModel) => {
    fetch(`/api/creatures/${creature.id}`, {
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
