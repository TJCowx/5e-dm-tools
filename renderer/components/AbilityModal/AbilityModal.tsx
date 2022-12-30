import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from '@mui/material';
import BasicTextField from 'components/Fields/Basic/BasicTextField';
import ListItemText from 'components/List/ListItemText';
import Modal from 'components/Modal/Modal';
import Ability from 'models/monster/Ability';
import { FC, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { RequireMessage } from 'utils/validationMessages';
import { object as yupObject, string as yupString, ValidationError } from 'yup';

type Props = {
  onSave: (ability: Ability) => void;
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

const AbilityModal: FC<Props> = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ability, setAbility] = useState<Ability>(newAbility());
  const [errors, setErrors] = useState<ErrorSchema>({
    name: null,
    description: null,
  });

  const onCancel = () => {
    setAbility(newAbility());
    setIsModalOpen(false);
  };

  const onSubmit = () => {
    schema
      .validate(ability, { abortEarly: false })
      .then(() => {
        onSave(ability);
        setIsModalOpen(false);
        setAbility(newAbility());
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
    <>
      <ListItem disableGutters>
        <ListItemButton onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <MdOutlineAdd />
          </ListItemIcon>
          <ListItemText primary="Add ability" className="mb-0" />
        </ListItemButton>
      </ListItem>
      {isModalOpen && (
        <Modal title="Add Ability" isOpen={isModalOpen} onClose={onCancel}>
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
              onBlur={() =>
                setErrors((prev) => ({ ...prev, description: null }))
              }
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
      )}
    </>
  );
};

export default AbilityModal;
