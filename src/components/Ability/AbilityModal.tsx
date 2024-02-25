import { Button, styled } from '@mui/material';
import { useState } from 'react';
import { object as yupObject, string as yupString, ValidationError } from 'yup';

import BasicTextField from 'components/Fields/Basic/BasicTextField';
import Modal from 'components/Modal/Modal';
import Ability from 'models/creature/Ability';
import { RequireMessage } from 'utils/validationMessages';

type Props = {
  initialAbility?: Partial<Ability>;
  onSave: (ability: Partial<Ability>) => void;
  onClose: () => void;
};

type ErrorSchema = Partial<Record<keyof Ability, string | null>>;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& >:not(:last-of-type)': { marginBottom: '16px' },
  '& .actions-container > *:not(:last-of-type)': {
    marginRight: '16px',
  },
}));

const newAbility: Partial<Ability> = {
  name: '',
  description: '',
};

const schema = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString().required({
    field: 'description',
    message: RequireMessage,
  }),
});

function AbilityModal({ initialAbility = newAbility, onSave, onClose }: Props) {
  const [ability, setAbility] = useState<Partial<Ability>>(initialAbility);
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

        // Casting because `e.errors` is incorrectly types `string[]`
        (
          e.errors as unknown as { field: keyof Ability; message: string }[]
        ).forEach(({ field, message }) => {
          newErrors[field] = message;
        });

        setErrors(newErrors);
      });
  };

  return (
    <Modal title="Add Ability" isOpen onClose={onCancel}>
      <Container>
        <BasicTextField
          label="Name"
          value={ability.name ?? ''}
          onChange={(newVal) =>
            setAbility((prev) => ({ ...prev, name: newVal }))
          }
          error={errors.name}
          onBlur={() => setErrors((prev) => ({ ...prev, name: null }))}
        />
        <BasicTextField
          label="Description"
          value={ability.description ?? ''}
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
}

export default AbilityModal;
