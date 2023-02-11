import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import Creature from 'models/creature/Creature';
import { logMessage } from 'utils/logUtils';
import FormattedStat from 'components/Creature/FormattedStat';
import RHFIntegerField from 'components/Fields/RHF/RHFIntegerField';
import RHFSwitchField from 'components/Fields/RHF/RHFSwitchField';
import Combatant from 'models/initiative/Combatant';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getModifier } from 'utils/modifierUtils';
import { rollD20 } from 'utils/rollUtils';
import { v4 } from 'uuid';

type FormInputs = {
  creature: Creature;
  groupInitiativeRoll: boolean;
  creatureCount: number;
};

type Props = {
  onSubmit: (combatant: Combatant[]) => void;
  onCancel: () => void;
};

const StyledForm = styled('form')(() => ({
  marginTop: '16px',
  '& .actions-container': {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '& .stats-container': {
    display: 'flex',
    columnGap: '12px',
  },
}));

const AddCreatureCombatantForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [availableCreature, setAvailableCreature] = useState<Creature[]>([]);

  const { handleSubmit, reset, setValue, watch, control } = useForm<FormInputs>(
    {
      defaultValues: {
        groupInitiativeRoll: true,
        creatureCount: 1,
        creature: null,
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    fetch('/creatures', { method: 'GET' })
      .then(async (res) => {
        const { data } = await res.json();
        setAvailableCreature(data);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const creature = watch('creature');

  const handleCreatureSubmit = ({
    creature,
    creatureCount,
    groupInitiativeRoll,
  }: FormInputs) => {
    const initiativeModifier = getModifier(creature.dexterity);
    const groupInitiative = rollD20(initiativeModifier);

    const newCombatants: Combatant[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < creatureCount; i++) {
      newCombatants.push({
        id: v4(),
        name: creature.name,
        initiative: groupInitiativeRoll
          ? groupInitiative
          : rollD20(initiativeModifier),
        initiativeModifier,
        isPlayer: false,
        isDead: false,
        maxHp: creature.hitPoints,
        currentHp: creature.hitPoints,
        stats: creature,
      });
    }

    onSubmit(newCombatants);
    reset();
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  const handleAutocompleteChange = (
    val: (string | Creature)[] | Creature | string
  ) => {
    let newVal: Creature;

    // Autocomplete component is expecting (string | Creature)[] even though it's
    // emitting Creature. Handle the expected just in case
    if (Array.isArray(val)) {
      const firstVal = val[0];
      newVal =
        typeof firstVal === 'string'
          ? availableCreature.find(({ id }) => firstVal === id)
          : firstVal;
    } else if (typeof val === 'string') {
      newVal = availableCreature.find(({ id }) => val === id);
    } else {
      newVal = val;
    }

    setValue('creature', newVal);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleCreatureSubmit)}>
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error loading the creature list. Please try again.
        </Alert>
      )}
      <Controller
        control={control}
        name="creature"
        rules={{ required: 'Creature is required' }}
        render={({ field }) => (
          <Autocomplete
            value={field.value ?? null}
            disablePortal
            loading={isLoading}
            multiple={undefined}
            options={availableCreature}
            getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
            size="small"
            onChange={(_, val) => handleAutocompleteChange(val)}
            isOptionEqualToValue={(opt: Creature, val: string | Creature) =>
              val == null
                ? false
                : typeof val === 'string'
                ? opt.id === val
                : opt.id === val.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Creature"
                InputLabelProps={{ shrink: true }}
              />
            )}
            renderOption={(optProps, creatureOpt: Creature) => (
              <li {...optProps}>
                <Typography variant="subtitle2">
                  {creatureOpt.name}
                  <Typography variant="body2">
                    <i>
                      CR: {creatureOpt.challengeRating} | {creatureOpt.size}{' '}
                      {creatureOpt.type} | {creatureOpt.alignment}
                    </i>
                  </Typography>
                </Typography>
              </li>
            )}
          />
        )}
      />
      <div className="input-row mt-16">
        <RHFIntegerField
          control={control}
          fieldName="creatureCount"
          label="Number of Creatures"
          min={1}
          isRequired
        />
        <RHFSwitchField
          control={control}
          fieldName="groupInitiativeRoll"
          label="Group Initiative Roll"
        />
      </div>
      {creature != null && (
        <div className="creature-container">
          <Divider className="my-16" />
          <div className="description-container mb-16">
            <Typography variant="body2">
              <i>
                {creature.size} {creature.type} | {creature.alignment}
              </i>
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Challenge Rating:
              </Typography>{' '}
              {creature.challengeRating} ({creature.rewardXP}XP)
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Armour Class:
              </Typography>{' '}
              {creature.armourClass}
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Hit Points:
              </Typography>{' '}
              {creature.hitPoints} ({creature.hitDie})
            </Typography>
          </div>
          <div className="stats-container">
            <FormattedStat label="Strength" value={creature.strength} />
            <FormattedStat label="Dexterity" value={creature.dexterity} />
            <FormattedStat label="Constitution" value={creature.constitution} />
            <FormattedStat label="Intelligence" value={creature.intelligence} />
            <FormattedStat label="Wisdom" value={creature.wisdom} />
            <FormattedStat label="Charisma" value={creature.charisma} />
          </div>
        </div>
      )}
      <div className="actions-container">
        <Button className="mr-16" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" disableElevation type="submit">
          Add
        </Button>
      </div>
    </StyledForm>
  );
};

export default AddCreatureCombatantForm;
