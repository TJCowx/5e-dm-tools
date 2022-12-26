import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
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
    <Layout title={`Edit ${monster.name}`}>
      <NavBack
        href="/monsters"
        ariaLabel="Navigate to monsters list"
        tooltipText="Back to monsters list"
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
