import { Alert } from '@mui/material';
import CreatureForm from 'components/Creature/CreatureForm';
import NavBack from 'components/Links/NavBack';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import useDocumentTitle from 'hooks/useDocumentTitle';
import Creature from 'models/creature/Creature';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { convertCreatureFormToDB } from 'utils/creatureUtils';
import { logMessage } from 'utils/logUtils';

const DefaultValues: Creature = {
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

const CreateCreaturePage = () => {
  useDocumentTitle('Create');
  useConfirmBeforeExitPage();

  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);

  const { handleSubmit, control, watch } = useForm<Creature>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: Creature) => {
    setHasError(false);
    fetch('/creatures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertCreatureFormToDB(data)),
    })
      .then(() => {
        navigate('/creatures');
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
      });
  };

  return (
    <div>
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
    </div>
  );
};

export default CreateCreaturePage;
