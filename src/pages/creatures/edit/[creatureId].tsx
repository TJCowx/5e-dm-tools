import { styled } from '@mui/material';
import CreatureForm from 'components/Creature/CreatureForm';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import useInvoke from 'hooks/useInvoke';
import Creature from 'models/creature/Creature';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

function EditCreature() {
  const router = useRouter();
  const { creatureId } = router.query;

  const { data, isLoading, error } = useInvoke<Partial<Creature>>(
    'get_editable_creature_by_id',
    { id: parseInt(creatureId as string, 10) }
  );

  useConfirmBeforeExitPage();

  const { handleSubmit, control, watch, reset } = useForm<Partial<Creature>>();

  useEffect(() => {
    console.log(data);
    if (data) {
      reset(data);
    }
  }, [data]);

  const onSubmit = (formData: Partial<Creature>) => {
    console.log('SUBITTED');
    // updateCreature(formData)
    //   .then(() => {
    //     router.push('/creatures');
    //   })
    //   .catch((err) => {
    //     logMessage('error', err);
    //     console.error(err);
    //   });
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
}

export default EditCreature;
