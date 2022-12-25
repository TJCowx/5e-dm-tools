import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Ability from 'models/monster/Ability';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TextField from 'components/Fields/TextField';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import Modal from 'components/Modal/Modal';

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

const AbilityModal = ({ onSave }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<Ability>({
    defaultValues: { name: '', description: '' },
  });

  const onCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data: Ability) => {
    onSave(data);
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>Add ability</ListItemText>
        </ListItemButton>
      </ListItem>
      {isModalOpen && (
        <Modal title="Add Ability" isOpen={isModalOpen} onClose={onCancel}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TextField fieldName="name" label="Name" control={control} />
            <TextField
              fieldName="description"
              label="Description"
              control={control}
              isMultiline
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
