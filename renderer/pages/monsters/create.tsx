import { Alert } from '@mui/material';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import MonsterForm from 'components/Monster/MonsterForm';
import { MonsterModel } from 'models/monster/Monster';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';
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

  const [hasError, setHasError] = useState(false);

  const { handleSubmit, control, watch } = useForm<MonsterModel>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: MonsterModel) => {
    setHasError(false);
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
        logMessage('error', e);
        setHasError(true);
      });
  };

  return (
    <Layout title="Create Monster">
      <NavBack
        href="/monsters"
        ariaLabel="Go to monsters list"
        tooltipText="Back to monsters list"
      />
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error saving your monster. Try again.
        </Alert>
      )}
      <MonsterForm
        control={control}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Layout>
  );
};

export default CreateMonster;
