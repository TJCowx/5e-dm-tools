import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from '@mui/material';
import RHFIntegerField from 'components/RHFFields/RHFIntegerField';
import RHFSelectField from 'components/RHFFields/RHFSelectField';
import RHFSwitchField from 'components/RHFFields/RHFSwitchField';
import RHFTextField from 'components/RHFFields/RHFTextField';
import ListItemText from 'components/List/ListItemText';
import Modal from 'components/Modal/Modal';
import Action from 'models/monster/Action';
import { ActionTypeSelectOptions } from 'models/monster/ActionType';
import {
  AttackDeliverySelectOptions,
  AttackTypeSelectOptions,
} from 'models/monster/AttackType';
import { DamageTypeSelectOptions } from 'models/monster/DamageType';
import { FC, useMemo, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { MdAdd, MdDelete, MdOutlineAdd } from 'react-icons/md';

type Props = {
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Action) => void;
};

const StyledForm = styled('div')(() => ({
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
    '& .damage-field, .damage-dice-field': {
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

const newAction = () => ({
  id: null,
  name: '',
  description: '',
  actionType: null,
  isAttack: false,
  attackDelivery: null,
  attackType: null,
  combatantsHit: null,
  toHit: null,
  damage: [],
  reach: null,
});

const ActionModal: FC<Props> = ({ isLegendary, hasLair, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [action, setAction] = useState<Action>(newAction());

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
    setAction(newAction());
  };

  const onSubmit: SubmitHandler<Action> = (data: Action) => {
    onSave(data);
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton onClick={() => setIsOpen(true)}>
          <ListItemIcon>
            <MdOutlineAdd />
          </ListItemIcon>
          <ListItemText primary="Add action" className="mb-0" />
        </ListItemButton>
      </ListItem>
      {isOpen && (
        <Modal title="Add Action" isOpen={isOpen} onClose={handleClose}>
          <StyledForm>
            <RHFTextField
              fieldName="name"
              className="mb-16"
              label="Name"
              control={control}
              isRequired
            />
            <RHFTextField
              fieldName="description"
              className="mb-16"
              label="Description"
              control={control}
              isMultiline
              isRequired={!isAttack}
            />
            <RHFSelectField
              id="action-type-field"
              control={control}
              className="mb-12"
              fieldName="actionType"
              label="Action Type"
              options={actionTypeOptions}
              isRequired
            />
            <RHFSwitchField
              control={control}
              className="mb-16"
              fieldName="isAttack"
              label="Is Attack"
            />
            {isAttack && (
              <>
                <div className="grid mb-16">
                  <RHFSelectField
                    id="attack-delivery-field"
                    control={control}
                    fieldName="attackDelivery"
                    label="Attack Delivery"
                    options={AttackDeliverySelectOptions}
                    isRequired={isAttack}
                  />
                  <RHFSelectField
                    id="attack-type-field"
                    control={control}
                    fieldName="attackType"
                    label="Attack Type"
                    options={AttackTypeSelectOptions}
                    isRequired={isAttack}
                  />
                </div>
                <div className="grid mb-16">
                  <RHFIntegerField
                    control={control}
                    fieldName="toHit"
                    label="To Hit"
                    min={0}
                    isRequired={isAttack}
                  />
                  <RHFIntegerField
                    control={control}
                    fieldName="reach"
                    label="Reach"
                    min={0}
                    isRequired={isAttack}
                  />
                  <RHFIntegerField
                    control={control}
                    fieldName="combatantsHit"
                    label="Combatants Hit"
                    min={1}
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
                        <IconButton onClick={() => remove(i)} color="warning">
                          <MdDelete />
                        </IconButton>
                      }
                    >
                      <RHFTextField
                        fieldName={`damage.${i}.damage`}
                        className="damage-field"
                        label="Damage"
                        control={control}
                        isRequired={isAttack}
                      />
                      <RHFTextField
                        fieldName={`damage.${i}.damageDice`}
                        className="damage-dice-field"
                        label="Damage Dice"
                        control={control}
                        isRequired={isAttack}
                      />
                      <RHFSelectField
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
                        append({
                          id: undefined,
                          damage: '',
                          damageDice: '',
                          type: 'Non-Magical',
                        })
                      }
                    >
                      <ListItemIcon>
                        <MdAdd />
                      </ListItemIcon>
                      <ListItemText primary="Add damage" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </>
            )}
            <div className="actions-container">
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                disableElevation
                type="button"
                onClick={onSubmit}
              >
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
