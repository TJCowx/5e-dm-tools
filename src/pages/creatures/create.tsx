import { Alert } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { addNewCreature } from 'api/creatures';
import CreatureForm from 'components/Creature/CreatureForm';
import Layout from 'components/Layout/Layout';
import NavBack from 'components/Links/NavBack';
import Creature from 'models/creature/Creature';
import { logMessage } from 'utils/loggingUtils';

const DefaultValues: Partial<Creature> = {
  name: '',
  sizeId: undefined,
  creatureTypeId: undefined,
  alignmentId: undefined,

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

function CreateCreature() {
  // TODO: Fix router
  // const router = useRouter();

  const [hasError, setHasError] = useState(false);

  const { handleSubmit, control, watch } = useForm<Partial<Creature>>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: Partial<Creature>) => {
    setHasError(false);
    addNewCreature(data)
      .then(() => {
        // TODO: Fix this
        // router.push('/creatures');
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
      });
  };

  return (
    <Layout>
      <NavBack
      // TODO: uncomment
      /*         href="/creatures"
        ariaLabel="Go to creature list"
        tooltipText="Back to creatures list" */
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
