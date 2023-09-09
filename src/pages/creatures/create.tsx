import { Alert } from '@mui/material';
import { invoke } from '@tauri-apps/api/tauri';
import CreatureForm from 'components/Creature/CreatureForm';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import Creature from 'models/creature/Creature';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertCreatureFormToDB } from 'utils/creatureUtils';
import { logMessage } from 'utils/loggingUtils';

const DefaultValues: Partial<Creature> = {
  id: undefined,
  name: '',
  size: undefined,
  creatureType: undefined,
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
  rewardXp: 0,

  proficiencyIds: [],
  savingThrowIds: [],
  immunityIds: [],
  condImmunityIds: [],
  resistanceIds: [],
  weaknessIds: [],
  languageIds: [],

  abilities: [],
  actions: [],

  isLegendary: false,
  hasLair: false,
};

function CreateCreature() {
  const router = useRouter();

  const [hasError, setHasError] = useState(false);

  const { handleSubmit, control, watch } = useForm<Creature>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: Creature) => {
    setHasError(false);
    invoke('add_creature', { creature: convertCreatureFormToDB(data) })
      .then(() => {
        router.push('/creatures');
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
      });
  };

  return (
    <Layout>
      <NavBack
        href="/creatures"
        ariaLabel="Go to creature list"
        tooltipText="Back to creatures list"
      />
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error saving your creature. Try again.
        </Alert>
      )}
      <CreatureForm
        control={control}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Layout>
  );
}

export default CreateCreature;
