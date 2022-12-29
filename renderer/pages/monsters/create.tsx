import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import MonsterForm from 'components/Monster/MonsterForm';
import { MonsterModel } from 'models/monster/Monster';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { convertMonsterFormToDB } from 'utils/monsterUtils';

const DefaultValues: MonsterModel = {
  id: undefined,
  name: '',
  size: undefined,
  type: undefined,
  alignment: undefined,

  armourClass: undefined,
  hitPoints: undefined,
  hitDie: '',

  landSpeed: undefined,
  flySpeed: undefined,
  burrowSpeed: undefined,
  climbSpeed: undefined,
  hoverSpeed: undefined,

  blindsight: undefined,
  darkvision: undefined,
  tremorsense: undefined,
  truesight: undefined,

  strength: 10,
  dexterity: 10,
  intelligence: 10,
  constitution: 10,
  wisdom: 10,
  charisma: 10,
  profBonus: 0,

  challengeRating: 0,
  rewardXP: 0,

  proficiencies: [],
  savingThrows: [],
  immunities: [],
  condImmunities: [],
  resistances: [],
  weaknesses: [],
  languages: [],

  abilities: [],
  actions: [],

  isLegendary: false,
  hasLair: false,
};

const CreateMonster = () => {
  const router = useRouter();

  const { handleSubmit, control, setValue, watch } = useForm<MonsterModel>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: MonsterModel) => {
    console.log(data);
    fetch('/api/monsters', {
      method: 'POST',
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
    <Layout title="Create Monster">
      <NavBack
        href="/monsters"
        ariaLabel="Go to monsters list"
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

export default CreateMonster;
