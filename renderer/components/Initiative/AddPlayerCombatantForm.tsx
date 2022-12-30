import { Button } from '@mui/material';
import { styled } from '@mui/system';
import RHFIntegerField from 'components/RHFFields/RHFIntegerField';
import RHFTextField from 'components/RHFFields/RHFTextField';
import Combatant from 'models/initiative/Combatant';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

type Props = {
  onSubmit: (combatant: Combatant) => void;
  onCancel: () => void;
};

type FormInputs = {
  name: string;
  initiative: number;
  initiativeModifier: number;
};

const StyledForm = styled('form')(() => ({
  marginTop: '16px',
  '& .name-field': {
    marginBottom: '16px',
    width: '100%',
  },
  '& .action-container': {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const AddPlayerCombatantForm: FC<Props> = ({
  onSubmit: emitSubmit,
  onCancel,
}) => {
  const { handleSubmit, reset, control } = useForm<FormInputs>({
    defaultValues: { name: '', initiative: 0, initiativeModifier: 0 },
  });

  const onSubmit = (data: FormInputs) => {
    emitSubmit({
      id: v4(),
      name: data.name,
      initiative: data.initiative,
      initiativeModifier: data.initiativeModifier,
      isPlayer: true,
      isDead: false,
    });
    reset();
    document.getElementById('name-field').focus();
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        control={control}
        fieldName="name"
        id="name-field"
        className="name-field"
        label="Character Name"
        isRequired
      />
      <div className="input-row">
        <RHFIntegerField
          control={control}
          fieldName="initiative"
          label="Initiative"
          isRequired
        />
        <RHFIntegerField
          control={control}
          fieldName="initiativeModifier"
          label="Initiative Modifier"
          isRequired
        />
      </div>
      <div className="action-container">
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

export default AddPlayerCombatantForm;
