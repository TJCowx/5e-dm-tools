import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import IntegerField from 'components/Fields/IntegerField';
import SelectField from 'components/Fields/SelectField';
import TextField from 'components/Fields/TextField';
import Modal from 'components/Modal/Modal';
import Action from 'models/monster/Action';
import { ActionTypeSelectOptions } from 'models/monster/ActionType';
import {
  AttackDeliverySelectOptions,
  AttackTypeSelectOptions,
} from 'models/monster/AttackType';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSave: (action: Action) => void;
};

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& >:not(:last-of-type)': { marginBottom: '16px' },
  '& .actions-container > *:not(:last-of-type)': {
    marginRight: '16px',
  },
}));

const ActionModal: FC<Props> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<Action>({});

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = (data: Action) => {
    console.log(data);
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setIsOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>Add action</ListItemText>
        </ListItemButton>
      </ListItem>
      {isOpen && (
        <Modal title="Add Action" isOpen={isOpen} onClose={handleClose}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TextField fieldName="name" label="Name" control={control} />
            <TextField
              fieldName="description"
              label="Description"
              control={control}
              isMultiline
            />
            <SelectField
              id="action-type-field"
              control={control}
              fieldName="actionType"
              label="Action Type"
              options={ActionTypeSelectOptions}
            />
            <SelectField
              id="attack-delivery-field"
              control={control}
              fieldName="attackDelivery"
              label="Attack Delivery"
              options={AttackDeliverySelectOptions}
            />
            <SelectField
              id="attack-type-field"
              control={control}
              fieldName="attackType"
              label="Action Type"
              options={AttackTypeSelectOptions}
            />
            <IntegerField control={control} fieldName="toHit" label="To Hit" />
            <IntegerField control={control} fieldName="reach" label="Reach" />
            <div className="actions-container">
              <Button onClick={handleClose}>Cancel</Button>
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

export default ActionModal;
