import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Divider,
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
import { FC, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Action) => void;
};

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& .mb-16': { marginBottom: '16px' },
  '& .mb-12': { marginBottom: '12px' },
  '& .actions-container > *:not(:last-of-type)': {
    marginRight: '16px',
  },
  '& .grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    rowGap: '16px',
    columnGap: '12px',
  },
  '& .damage-list-item': {
    display: 'flex',
    '& .damage-field': {
      width: '100px',
      marginRight: '16px',
    },
    '& .damage-type-field': {
      flex: 1,
      marginRight: '16px',
    },
  },
  '& .pl-0': {
    paddingLeft: 0,
  },
}));

const ActionModal: FC<Props> = ({ isLegendary, hasLair, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm<Action>({
    defaultValues: {
      name: '',
      description: '',
      actionType: null,
      isAttack: false,
      attackDelivery: null,
      attackType: null,
      toHit: null,
      damage: [],
      reach: null,
    },
  });

  const {
    fields: damageFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'damage',
  });

  const isAttack = watch('isAttack');

  const actionTypeOptions = useMemo(
    () =>
      ActionTypeSelectOptions.filter((type) => {
        if (type.value === 'Legendary' && !isLegendary) return false;
        if (type.value === 'Lair' && !hasLair) return false;

        return true;
      }),
    [isLegendary, hasLair]
  );

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = (data: Action) => {
    onSave(data);
    setIsOpen(false);
    reset();
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
              className="mb-16"
              label="Name"
              control={control}
              isRequired
            />
            <TextField
              fieldName="description"
              className="mb-16"
              label="Description"
              control={control}
              isMultiline
              isRequired
            />
            <SelectField
              id="action-type-field"
              control={control}
              className="mb-12"
              fieldName="actionType"
              label="Action Type"
              options={actionTypeOptions}
              isRequired
            />
            <SwitchField
              control={control}
              className="mb-16"
              fieldName="isAttack"
              label="Is Attack"
            />
            {isAttack && (
              <>
                <div className="grid mb-16">
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
                </div>
                <div className="grid mb-16">
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
                </div>
                <Divider />
                <List dense>
                  {damageFields.map((damage, i) => (
                    <ListItem
                      key={damage.id}
                      className="damage-list-item pl-0"
                      secondaryAction={
                        <IconButton onClick={() => remove(i)}>
                          <DeleteIcon color="warning" />
                        </IconButton>
                      }
                    >
                      <TextField
                        fieldName={`damage.${i}.damage`}
                        className="damage-field"
                        label="Damage"
                        control={control}
                        isRequired={isAttack}
                      />
                      <SelectField
                        id={`damage-${i}-type`}
                        control={control}
                        className="damage-type-field"
                        fieldName={`damage.${i}.type`}
                        label="Damage Type"
                        options={DamageTypeSelectOptions}
                        isRequired={isAttack}
                      />
                    </ListItem>
                  ))}
                  <ListItem className="pl-0">
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
