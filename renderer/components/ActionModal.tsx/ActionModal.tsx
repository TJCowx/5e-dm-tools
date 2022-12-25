import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import IntegerField from 'components/Fields/IntegerField';
import SelectField from 'components/Fields/SelectField';
import SwitchField from 'components/Fields/SwitchField';
import TextField from 'components/Fields/TextField';
import Modal from 'components/Modal/Modal';
import Action from 'models/monster/Action';
import { ActionTypeSelectOptions } from 'models/monster/ActionType';
import {
  AttackDeliverySelectOptions,
  AttackTypeSelectOptions,
} from 'models/monster/AttackType';
import { DamageTypeSelectOptions } from 'models/monster/DamageType';
import { FC, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

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

  const { control, handleSubmit, reset, watch } = useForm<Action>({});

  const {
    fields: damageFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'damage',
  });

  const isAttack = watch('isAttack');

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
            <TextField
              fieldName="name"
              label="Name"
              control={control}
              isRequired
            />
            <TextField
              fieldName="description"
              label="Description"
              control={control}
              isMultiline
              isRequired
            />
            <SelectField
              id="action-type-field"
              control={control}
              fieldName="actionType"
              label="Action Type"
              options={ActionTypeSelectOptions}
              isRequired
            />
            <SwitchField
              control={control}
              fieldName="isAttack"
              label="Is Attack"
            />
            {isAttack && (
              <>
                <SelectField
                  id="attack-delivery-field"
                  control={control}
                  fieldName="attackDelivery"
                  label="Attack Delivery"
                  options={AttackDeliverySelectOptions}
                  isRequired={isAttack}
                />
                <SelectField
                  id="attack-type-field"
                  control={control}
                  fieldName="attackType"
                  label="Attack Type"
                  options={AttackTypeSelectOptions}
                  isRequired={isAttack}
                />
                <IntegerField
                  control={control}
                  fieldName="toHit"
                  label="To Hit"
                  min={0}
                  isRequired={isAttack}
                />
                <IntegerField
                  control={control}
                  fieldName="reach"
                  label="Reach"
                  min={0}
                  isRequired={isAttack}
                />
                <List dense>
                  {damageFields.map((damage, i) => (
                    <ListItem
                      key={damage.id}
                      secondaryAction={
                        <IconButton onClick={() => remove(i)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <TextField
                        fieldName={`damage.${i}.damage`}
                        label="Damage"
                        control={control}
                        isRequired={isAttack}
                      />
                      <SelectField
                        id={`damage-${i}-type`}
                        control={control}
                        fieldName={`damage.${i}.type`}
                        label="Damage Type"
                        options={DamageTypeSelectOptions}
                        isRequired={isAttack}
                      />
                    </ListItem>
                  ))}
                  <ListItem>
                    <ListItemButton
                      onClick={() =>
                        append({ damage: '', type: 'Non-Magical' })
                      }
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText>Add damage</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </>
            )}
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
