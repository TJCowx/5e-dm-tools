import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import CreatureForm from 'components/Creature/CreatureForm';
import dbConnect from 'db/dbConnect';
import Creature, { CreatureModel } from 'models/creature/Creature';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';
import { convertCreatureFormToDB, mapCreatureDoc } from 'utils/creatureUtils';

type Props = {
  creature: CreatureModel;
  error: null | 'not-found' | 'server';
};

const EditCreature: FC<Props> = ({ creature, error }) => {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<CreatureModel>({
    defaultValues: creature,
  });

  const onSubmit = (data: CreatureModel) => {
    fetch(`/api/creature/${creature.id}`, {
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
    <Layout title={`Edit ${creature.name}`}>
      <NavBack
        href="/creatures"
        ariaLabel="Navigate to creature list"
        tooltipText="Back to creatures list"
      />
      <CreatureForm
        control={control}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    await dbConnect();

    const res = await Creature.findById(query.creatureId);

    if (!res) return { props: { creature: null, error: 'not-found' } };

    return { props: { creature: mapCreatureDoc(res.toObject()) } };
  } catch (e) {
    logMessage('error', e);
    return { props: { creature: null, error: 'server' } };
  }
};

export default EditCreature;
