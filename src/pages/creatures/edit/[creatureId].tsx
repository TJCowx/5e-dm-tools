import { styled } from '@mui/material';
import { getCreatureById, updateCreature } from 'api/creatures';
import CreatureForm from 'components/Creature/CreatureForm';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import Creature from 'models/creature/Creature';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

const EditCreature = () => {
  const router = useRouter();
  const { creatureId } = router.query;

  useConfirmBeforeExitPage();

  const [creature, setCreature] = useState<Creature>();
  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit, control, watch, reset } = useForm<Creature>({
    defaultValues: creature,
  });

  useEffect(() => {
    getCreatureById(creatureId as string)
      .then((res) => {
        setCreature(res);
        reset(res);
        setIsLoading(false);
      })
      .catch(() => {
        // TODO: Add error logging
        setIsLoading(false);
      });
  }, []);

  const onSubmit = (data: Creature) => {
    updateCreature(data)
      .then(() => {
        router.push('/creatures');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
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
