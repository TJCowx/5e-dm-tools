import { styled } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { updateCreature } from '@api/creatures';
import { CreatureForm } from '@components/Creature';
import { NavBack } from '@components/Links';
import { LoadingSpinner } from '@components/LoadingSpinner';
import useConfirmBeforeExitPage from '@hooks/useConfirmBeforeExitPage';
import useInvoke from '@hooks/useInvoke';
import Creature from '@models/creature/Creature';
import { logMessage } from '@utils/loggingUtils';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '84px',
}));

function EditCreature() {
  // TODO: Fix router
  // const router = useRouter();
  // const { creatureId } = router.query;
  const creatureId = '1';

  const { data, isLoading } = useInvoke<Partial<Creature>>(
    'get_editable_creature_by_id',
    { id: parseInt(creatureId as string, 10) },
  );

  useConfirmBeforeExitPage();

  const { handleSubmit, control, watch, reset } = useForm<Partial<Creature>>();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const onSubmit = (formData: Partial<Creature>) => {
    updateCreature(formData)
      .then(() => {
        // TODO: Fix this
        // router.push('/creatures');
      })
      .catch((err) => {
        logMessage('error', err);
        console.error(err);
      });
  };

  return (
    <>
      <NavBack
      // TODO: Uncomment
      /*         href="/creatures"
        ariaLabel="Navigate to creature list"
        tooltipText="Back to creatures list" */
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
    </>
  );
}

export default EditCreature;
