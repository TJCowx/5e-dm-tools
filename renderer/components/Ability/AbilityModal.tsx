import { Button, styled } from '@mui/material';
import Ability from 'models/creature/Ability';
import BasicTextField from 'components/Fields/Basic/BasicTextField';
import Modal from 'components/Modal/Modal';
import { FC, useState } from 'react';
import { RequireMessage } from 'utils/validationMessages';
import { object as yupObject, string as yupString, ValidationError } from 'yup';

type Props = {
  initialAbility?: Ability;
  onSave: (ability: Ability) => void;
  onClose: () => void;
};

type ErrorSchema = Partial<Record<keyof Ability, string>>;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& >:not(:last-of-type)': { marginBottom: '16px' },
  '& .actions-container > *:not(:last-of-type)': {
    marginRight: '16px',
  },
}));

const newAbility = (): Ability => ({ id: null, name: '', description: '' });

const schema = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString().required({
    field: 'description',
    message: RequireMessage,
  }),
});

const AbilityModal: FC<Props> = ({ initialAbility, onSave, onClose }) => {
  const [ability, setAbility] = useState<Ability>(
    initialAbility ?? newAbility()
  );
  const [errors, setErrors] = useState<ErrorSchema>({
    name: null,
    description: null,
  });

  const onCancel = () => {
    onClose();
  };

  const onSubmit = () => {
    schema
      .validate(ability, { abortEarly: false })
      .then(() => {
        onSave(ability);
        onClose();
      })
      .catch((e: ValidationError) => {
        const newErrors: Partial<ErrorSchema> = {};
        (e.errors as unknown as { field: string; message: string }[]).forEach(
          (err) => {
            newErrors[err.field] = err.message;
          }
        );
        setErrors(newErrors);
      });
  };

  return (
    <Modal title="Add Ability" isOpen onClose={onCancel}>
      <Container>
        <BasicTextField
          label="Name"
          value={ability.name}
          onChange={(newVal) =>
            setAbility((prev) => ({ ...prev, name: newVal }))
          }
          error={errors.name}
          onBlur={() => setErrors((prev) => ({ ...prev, name: null }))}
        />
        <BasicTextField
          label="Description"
          value={ability.description}
          isMultiline
          onChange={(newVal) =>
            setAbility((prev) => ({ ...prev, description: newVal }))
          }
          error={errors.description}
          onBlur={() => setErrors((prev) => ({ ...prev, description: null }))}
        />
        <div className="actions-container">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            variant="contained"
            disableElevation
            type="button"
            onClick={() => onSubmit()}
          >
            Save
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default AbilityModal;
