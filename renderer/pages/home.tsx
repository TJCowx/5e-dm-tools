import dbConnect from 'db/dbConnect';
import Monster, { IMonster } from 'models/Monster';
import Button from '@mui/material/Button';
import Layout from 'components/Layout/Layout';

interface Props {
  monsters: IMonster[];
}

const Home = ({ monsters }: Props) => (
  <Layout title="Home">
    <h1>Monsters</h1>
    <Button
      variant="contained"
      onClick={() => {
        fetch('/api/monsters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'New Monster' }),
        });
      }}
    >
      Create Monster
    </Button>
    <ul>
      {(monsters ?? []).map((m) => (
        <li key={m.id}>{m.name}</li>
      ))}
    </ul>
  </Layout>
);

export const getServerSideProps = async () => {
  await dbConnect();

  const res = await Monster.find();

  const monsters = res.map((doc) => {
    const { _id: id, name } = doc.toObject();
    return {
      id: id.toString(),
      name,
    };
  });

  return { props: { monsters } };
};

export default Home;
