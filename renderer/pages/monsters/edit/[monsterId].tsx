import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import MonsterForm from 'components/Monster/MonsterForm';
import dbConnect from 'db/dbConnect';
import Monster, { MonsterModel } from 'models/monster/Monster';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';
import { convertMonsterFormToDB, mapMonsterDoc } from 'utils/monsterUtils';

type Props = {
  monster: MonsterModel;
  error: null | 'not-found' | 'server';
};

const EditMonster: FC<Props> = ({ monster, error }) => {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<MonsterModel>({
    defaultValues: monster,
  });

  const onSubmit = (data: MonsterModel) => {
    fetch(`/api/monsters/${monster.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertMonsterFormToDB(data)),
    })
      .then(() => {
        router.push('/monsters');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <Layout title={`Edit ${monster.name}`}>
      <NavBack
        href="/monsters"
        ariaLabel="Navigate to monsters list"
        tooltipText="Back to monsters list"
      />
      <MonsterForm
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

    const res = await Monster.findById(query.monsterId);

    if (!res) return { props: { monster: null, error: 'not-found' } };

    return { props: { monster: mapMonsterDoc(res.toObject()) } };
  } catch (e) {
    logMessage('error', e);
    return { props: { monster: null, error: 'server' } };
  }
};

export default EditMonster;
