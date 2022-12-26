import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import MonsterForm from 'components/Monster/MonsterForm';
import dbConnect from 'db/dbConnect';
import Monster, { MonsterModel } from 'models/monster/Monster';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { convertMonsterFormToDB } from 'utils/monsterUtils';

type Props = {
  monster: MonsterModel;
};

const EditMonster: FC<Props> = ({ monster }) => {
  const router = useRouter();

  const { handleSubmit, control, setValue, watch } = useForm<MonsterModel>({
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
        // TODO: Handle error
        console.error(e);
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
        setValue={setValue}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await dbConnect();

  const res = await Monster.findById(query.monsterId);

  // TODO: Handle no monster error

  const { _id: id, ...restOfMonster } = res.toObject();

  const monster: MonsterModel = {
    id: id.toString(),
    ...restOfMonster,
  };

  return { props: { monster } };
};

export default EditMonster;
