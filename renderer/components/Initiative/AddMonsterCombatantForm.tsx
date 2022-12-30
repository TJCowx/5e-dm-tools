import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import RHFIntegerField from 'components/RHFFields/RHFIntegerField';
import RHFSwitchField from 'components/RHFFields/RHFSwitchField';
import FormattedStat from 'components/Monster/FormattedStat';
import Combatant from 'models/initiative/Combatant';
import { MonsterModel } from 'models/monster/Monster';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';
import { getModifier } from 'utils/modifierUtils';
import { rollD20 } from 'utils/rollUtils';
import { v4 } from 'uuid';

type FormInputs = {
  monster: MonsterModel;
  groupInitiativeRoll: boolean;
  monsterCount: number;
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

const AddMonsterCombatantForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [availableMonsters, setAvailableMonsters] = useState<MonsterModel[]>(
    []
  );

  const { handleSubmit, reset, setValue, watch, control } = useForm<FormInputs>(
    {
      defaultValues: {
        groupInitiativeRoll: true,
        monsterCount: 1,
        monster: null,
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/monsters', { method: 'GET' })
      .then(async (res) => {
        const { data } = await res.json();
        setAvailableMonsters(data);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const monster = watch('monster');

  const handleMonsterSubmit = ({
    monster: submittedMonster,
    monsterCount,
    groupInitiativeRoll,
  }: FormInputs) => {
    const initiativeModifier = getModifier(submittedMonster.dexterity);
    const groupInitiative = rollD20(initiativeModifier);

    const newCombatants: Combatant[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < monsterCount; i++) {
      newCombatants.push({
        id: v4(),
        name: submittedMonster.name,
        initiative: groupInitiativeRoll
          ? groupInitiative
          : rollD20(initiativeModifier),
        initiativeModifier,
        isPlayer: false,
        isDead: false,
        maxHp: submittedMonster.hitPoints,
        currentHp: submittedMonster.hitPoints,
        monsterStats: submittedMonster,
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
    val: (string | MonsterModel)[] | MonsterModel | string
  ) => {
    let newVal: MonsterModel;

    // Autocomplete component is expecting (string | MonsterModel)[] even though it's
    // emitting MonsterModal. Handle the expected just in case
    if (Array.isArray(val)) {
      const firstVal = val[0];
      newVal =
        typeof firstVal === 'string'
          ? availableMonsters.find(({ id }) => firstVal === id)
          : firstVal;
    } else if (typeof val === 'string') {
      newVal = availableMonsters.find(({ id }) => val === id);
    } else {
      newVal = val;
    }

    setValue('monster', newVal);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleMonsterSubmit)}>
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error loading the monster list. Please try again.
        </Alert>
      )}
      <Controller
        control={control}
        name="monster"
        rules={{ required: 'Monster is required' }}
        render={({ field }) => (
          <Autocomplete
            value={field.value ?? null}
            disablePortal
            loading={isLoading}
            multiple={undefined}
            options={availableMonsters}
            getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
            size="small"
            onChange={(_, val) => handleAutocompleteChange(val)}
            isOptionEqualToValue={(
              opt: MonsterModel,
              val: string | MonsterModel
            ) =>
              val == null
                ? false
                : typeof val === 'string'
                ? opt.id === val
                : opt.id === val.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Monster"
                InputLabelProps={{ shrink: true }}
              />
            )}
            renderOption={(optProps, monsterOpt: MonsterModel) => (
              <li {...optProps}>
                <Typography variant="subtitle2">
                  {monsterOpt.name}
                  <Typography variant="body2">
                    <i>
                      CR: {monsterOpt.challengeRating} | {monsterOpt.size}{' '}
                      {monsterOpt.type} | {monsterOpt.alignment}
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
          fieldName="monsterCount"
          label="Number of Monsters"
          min={1}
          isRequired
        />
        <RHFSwitchField
          control={control}
          fieldName="groupInitiativeRoll"
          label="Group Initiative Roll"
        />
      </div>
      {monster != null && (
        <div className="monster-container">
          <Divider className="my-16" />
          <div className="description-container mb-16">
            <Typography variant="body2">
              <i>
                {monster.size} {monster.type} | {monster.alignment}
              </i>
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Challenge Rating:
              </Typography>{' '}
              {monster.challengeRating} ({monster.rewardXP}XP)
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Armour Class:
              </Typography>{' '}
              {monster.armourClass}
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Hit Points:
              </Typography>{' '}
              {monster.hitPoints} ({monster.hitDie})
            </Typography>
          </div>
          <div className="stats-container">
            <FormattedStat label="Strength" value={monster.strength} />
            <FormattedStat label="Dexterity" value={monster.dexterity} />
            <FormattedStat label="Constitution" value={monster.constitution} />
            <FormattedStat label="Intelligence" value={monster.intelligence} />
            <FormattedStat label="Wisdom" value={monster.wisdom} />
            <FormattedStat label="Charisma" value={monster.charisma} />
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

export default AddMonsterCombatantForm;
