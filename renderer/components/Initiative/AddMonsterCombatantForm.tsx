import {
  Autocomplete,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import IntegerField from 'components/Fields/IntegerField';
import SwitchField from 'components/Fields/SwitchField';
import FormattedStat from 'components/Monster/FormattedStat';
import Combatant from 'models/initiative/Combatant';
import { MonsterModel } from 'models/monster/Monster';
import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormInputs = {
  monster: MonsterModel;
  groupInitiativeRoll: boolean;
  monsterCount: number;
};

type Props = {
  onSubmit: (combatant: Combatant) => void;
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

const AddMonsterCombatantForm: FC<Props> = ({
  onSubmit: emitSubmit,
  onCancel,
}) => {
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
    fetch('/api/monsters', { method: 'GET' })
      .then(async (res) => {
        const { data } = await res.json();
        console.log(data);
        setAvailableMonsters(data);
      })
      .catch((e) => {
        // TODO: Handle Error
        console.error(e);
      });
  }, []);

  const monsterId = watch('monster')?.id;

  const selectedMonster = useMemo(
    () => availableMonsters.find(({ id }) => id === monsterId),
    [monsterId]
  );

  const onSubmit = (data: FormInputs) => {
    console.log(data);
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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="monster"
        rules={{ required: 'Monster is required' }}
        render={({ field }) => (
          <Autocomplete
            value={field.value ?? null}
            disablePortal
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
        <IntegerField
          control={control}
          fieldName="monsterCount"
          label="Number of Monsters"
          min={1}
          isRequired
        />
        <SwitchField
          control={control}
          fieldName="groupInitiativeRoll"
          label="Group Initiative Roll"
        />
      </div>
      {selectedMonster != null && (
        <div className="monster-container">
          <Divider className="my-16" />
          <div className="description-container mb-16">
            <Typography variant="body2">
              <i>
                {selectedMonster.size} {selectedMonster.type} |{' '}
                {selectedMonster.alignment}
              </i>
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Challenge Rating:
              </Typography>{' '}
              {selectedMonster.challengeRating} ({selectedMonster.rewardXP}XP)
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Armour Class:
              </Typography>{' '}
              {selectedMonster.armourClass}
            </Typography>
            <Typography variant="body2">
              <Typography variant="subtitle2" component="span">
                Hit Points:
              </Typography>{' '}
              {selectedMonster.hitPoints} ({selectedMonster.hitDie})
            </Typography>
          </div>
          <div className="stats-container">
            <FormattedStat label="Strength" value={selectedMonster.strength} />
            <FormattedStat
              label="Dexterity"
              value={selectedMonster.dexterity}
            />
            <FormattedStat
              label="Constitution"
              value={selectedMonster.constitution}
            />
            <FormattedStat
              label="Intelligence"
              value={selectedMonster.intelligence}
            />
            <FormattedStat label="Wisdom" value={selectedMonster.wisdom} />
            <FormattedStat label="Charisma" value={selectedMonster.charisma} />
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
