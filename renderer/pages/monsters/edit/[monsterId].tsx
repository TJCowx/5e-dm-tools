import Layout from 'components/Layout/Layout';
import dbConnect from 'db/dbConnect';
import Monster, { MonsterModel } from 'models/monster/Monster';
import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  monster: MonsterModel;
};

const EditMonster: FC<Props> = ({ monster }) => {
  const { handleSubmit, control, setValue, watch } = useForm<MonsterModel>({
    defaultValues: monster,
  });

  return (
    <Layout title="TODO">
      <div>{JSON.stringify(monster)}</div>
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
