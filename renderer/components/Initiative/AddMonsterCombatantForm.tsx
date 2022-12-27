import { Autocomplete, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import IntegerField from 'components/Fields/IntegerField';
import SwitchField from 'components/Fields/SwitchField';
import Combatant from 'models/initiative/Combatant';
import { MonsterModel } from 'models/monster/Monster';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
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
}));

const AddMonsterCombatantForm: FC<Props> = ({
  onSubmit: emitSubmit,
  onCancel,
}) => {
  const [availableMonsters, setAvailableMonsters] = useState<MonsterModel[]>(
    []
  );
  const [selectedMonster, setSelectedMonster] = useState<MonsterModel | null>(
    null
  );

  const { handleSubmit, reset, control } = useForm<FormInputs>({
    defaultValues: { groupInitiativeRoll: true, monsterCount: 1 },
  });

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

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  const handleAutocompleteChange = (
    val: (string | MonsterModel)[] | MonsterModel
  ) => {
    let newVal: MonsterModel;

    // Autocomplete component is expecting (string | MonsterModel)[] even though it's
    // emitting MonsterModal. Handle the expected just in case
    if (Array.isArray(val)) {
      const firstVal = val[0];
      newVal =
        typeof firstVal === 'string'
          ? availableMonsters.find(({ id }) => id === firstVal)
          : firstVal;
    } else {
      newVal = val;
    }

    setSelectedMonster(newVal);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete<MonsterModel>
        disablePortal
        multiple={undefined}
        options={availableMonsters}
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
        size="small"
        onChange={(_, val) => handleAutocompleteChange(val)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Monster"
            InputLabelProps={{ shrink: true }}
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
