import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from '@mui/material';
import RHFTextField from 'components/RHFFields/RHFTextField';
import ListItemText from 'components/List/ListItemText';
import Modal from 'components/Modal/Modal';
import Ability from 'models/monster/Ability';
import { BaseSyntheticEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineAdd } from 'react-icons/md';

type Props = {
  onSave: (ability: Ability) => void;
};

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& >:not(:last-of-type)': { marginBottom: '16px' },
  '& .actions-container > *:not(:last-of-type)': {
    marginRight: '16px',
  },
}));

const AbilityModal: FC<Props> = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<Ability>({
    defaultValues: { name: '', description: '' },
  });

  const onCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data: Ability, e: BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSave(data);
    setIsModalOpen(false);
    reset();
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
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              fieldName="name"
              label="Name"
              control={control}
              isRequired
            />
            <RHFTextField
              fieldName="description"
              label="Description"
              control={control}
              isMultiline
              isRequired
            />
            <div className="actions-container">
              <Button onClick={onCancel}>Cancel</Button>
              <Button variant="contained" disableElevation type="submit">
                Save
              </Button>
            </div>
          </StyledForm>
        </Modal>
      )}
    </>
  );
};

export default AbilityModal;
