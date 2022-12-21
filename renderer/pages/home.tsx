import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import dbConnect from '../db/dbConnect';
import Monster, { IMonster } from '../models/Monster';
import { ObjectId } from 'mongoose';

interface Props {
  monsters: IMonster[];
}

function Home({ monsters }: Props) {
  return (
    <React.Fragment>
      <Head children={<title>Home - Nextron (with-typescript)</title>} />
      <h1>Monsters</h1>
      <button
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
      </button>
      <ul>
        {(monsters ?? []).map((m) => (
          <li>{m.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  await dbConnect();

  const res = await Monster.find();

  const monsters = res.map((doc) => {
    const monster = doc.toObject();
    return {
      id: monster._id.toString(),
      name: monster.name,
    };
  });

  return { props: { monsters } };
};

export default Home;
