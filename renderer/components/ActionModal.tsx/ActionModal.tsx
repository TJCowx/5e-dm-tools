import {
  Alert,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from '@mui/material';
import BasicNumberField from 'components/Fields/Basic/BasicNumberField';
import BasicSelectField from 'components/Fields/Basic/BasicSelectField';
import BasicSwitchField from 'components/Fields/Basic/BasicSwitchField';
import BasicTextField from 'components/Fields/Basic/BasicTextField';
import ListItemText from 'components/List/ListItemText';
import Modal from 'components/Modal/Modal';
import Action from 'models/monster/Action';
import ActionType, { ActionTypeSelectOptions } from 'models/monster/ActionType';
import {
  AttackDelivery,
  AttackDeliverySelectOptions,
  AttackType,
  AttackTypeSelectOptions,
} from 'models/monster/AttackType';
import Damage from 'models/monster/Damage';
import DamageType, { DamageTypeSelectOptions } from 'models/monster/DamageType';
import { FC, useMemo, useState } from 'react';
import { MdAdd, MdDelete, MdOutlineAdd } from 'react-icons/md';
import { RequireMessage } from 'utils/validationMessages';
import {
  array as yupArray,
  boolean as yupBoolean,
  number as yupNumber,
  object as yupObject,
  string as yupString,
  ValidationError,
} from 'yup';

type Props = {
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Action) => void;
};

type ErrorSchema = Record<keyof Action, string>;

const schema = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString().when('isAttack', {
    is: false,
    then: yupString().required({
      field: 'description',
      message: RequireMessage,
    }),
  }),
  actionType: yupString().nullable().required({
    field: 'actionType',
    message: RequireMessage,
  }),
  isAttack: yupBoolean(),
  attackDelivery: yupString()
    .nullable()
    .when('isAttack', {
      is: true,
      then: yupString().nullable().required({
        field: 'attackDelivery',
        message: RequireMessage,
      }),
    }),
  attackType: yupString()
    .nullable()
    .when('isAttack', {
      is: true,
      then: yupString().nullable().required({
        field: 'attackType',
        message: RequireMessage,
      }),
    }),
  toHit: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: yupNumber()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required({ field: 'toHit', message: RequireMessage })
        .min(0, {
          field: 'toHit',
          message: 'Must be greater than or equal to 0',
        }),
    }),
  reach: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: yupNumber()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required({ field: 'reach', message: RequireMessage })
        .min(0, {
          field: 'reach',
          message: 'Must be greater than or equal to 0',
        }),
    }),
  combatantsHit: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: yupNumber()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required({ field: 'combatantsHit', message: RequireMessage })
        .min(1, {
          field: 'combatantsHit',
          message: 'Must be greater than or equal to 1',
        }),
    }),
  damage: yupArray(
    yupObject().shape({
      damage: yupString().required({
        field: 'damage',
        message: 'Amount of Damage is required',
      }),
      damageDice: yupString().required({
        field: 'damage',
        message: 'Damage Dice is required',
      }),
      type: yupString().required({
        field: 'damage',
        message: 'Damage Type is required',
      }),
    })
  ),
});

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
  const [errors, setErrors] = useState<Partial<ErrorSchema>>({});

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
    setErrors({});
    setAction(newAction());
  };

  const onSubmit = () => {
    schema
      .validate(action, { abortEarly: false })
      .then(() => {
        onSave(action);
        setIsOpen(false);
        setAction(newAction());
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

  const updateDamageItem = (damage: Damage, i: number) => {
    const arrCopy = action.damage;

    arrCopy[i] = damage;
    setAction((prev) => ({ ...prev, damage: arrCopy }));
  };

  const removeDamageItem = (i: number) => {
    const arrCopy = action.damage;
    arrCopy.splice(i, 1);
    setAction((prev) => ({ ...prev, damage: arrCopy }));
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
            <BasicTextField
              value={action.name}
              className="mb-16"
              label="Name"
              error={errors.name}
              onChange={(newVal) =>
                setAction((prev) => ({ ...prev, name: newVal }))
              }
              onBlur={() => setErrors((prev) => ({ ...prev, name: null }))}
            />
            <BasicTextField
              value={action.description}
              className="mb-16"
              label="Description"
              isMultiline
              error={errors.description}
              onChange={(newVal) =>
                setAction((prev) => ({ ...prev, description: newVal }))
              }
              onBlur={() =>
                setErrors((prev) => ({ ...prev, description: null }))
              }
            />
            <BasicSelectField
              id="action-type-field"
              value={action.actionType}
              className="mb-16"
              label="Action Type"
              error={errors.actionType}
              options={actionTypeOptions}
              onChange={(newVal: ActionType) =>
                setAction((prev) => ({ ...prev, actionType: newVal }))
              }
              onBlur={() =>
                setErrors((prev) => ({ ...prev, actionType: null }))
              }
            />
            <BasicSwitchField
              value={action.isAttack}
              className="mb-16"
              label="Is Attack"
              onChange={
                (isChecked) =>
                  setAction((prev) => ({ ...prev, isAttack: isChecked })) // TODO: Remove Action stuff??
              }
            />
            {action.isAttack && (
              <>
                <div className="grid mb-16">
                  <BasicSelectField
                    id="attack-delivery-field"
                    value={action.attackDelivery}
                    label="Attack Delivery"
                    error={errors.attackDelivery}
                    options={AttackDeliverySelectOptions}
                    onChange={(newVal: AttackDelivery) =>
                      setAction((prev) => ({ ...prev, attackDelivery: newVal }))
                    }
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, attackDelivery: null }))
                    }
                  />
                  <BasicSelectField
                    id="attack-type-field"
                    label="Attack Type"
                    value={action.attackType}
                    error={errors.actionType}
                    options={AttackTypeSelectOptions}
                    onChange={(newVal: AttackType) =>
                      setAction((prev) => ({ ...prev, attackType: newVal }))
                    }
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, attackType: null }))
                    }
                  />
                </div>
                <div className="grid mb-16">
                  <BasicNumberField
                    value={action.toHit}
                    label="To Hit"
                    min={0}
                    error={errors.toHit}
                    onChange={(newVal) =>
                      setAction((prev) => ({ ...prev, toHit: newVal }))
                    }
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, toHit: null }))
                    }
                  />
                  <BasicNumberField
                    value={action.reach}
                    label="Reach"
                    min={0}
                    step={5}
                    error={errors.reach}
                    onChange={(newVal) =>
                      setAction((prev) => ({ ...prev, reach: newVal }))
                    }
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, reach: null }))
                    }
                  />
                  <BasicNumberField
                    value={action.combatantsHit}
                    label="Combatants Hit"
                    min={1}
                    error={errors.combatantsHit}
                    onChange={(newVal) =>
                      setAction((prev) => ({
                        ...prev,
                        combatantsHit: Number(newVal),
                      }))
                    }
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, combatantsHit: null }))
                    }
                  />
                </div>
                <Divider />
                {!!errors.damage?.length && (
                  <Alert
                    severity="error"
                    sx={{ marginTop: '12px', marginBottom: '12px' }}
                  >
                    {errors.damage}
                  </Alert>
                )}
                <List dense>
                  {action.damage.map((damage, i) => (
                    <ListItem
                      key={damage.id || `damage-${i}`}
                      className="damage-list-item pl-0"
                      secondaryAction={
                        <IconButton
                          onClick={() => removeDamageItem(i)}
                          color="warning"
                        >
                          <MdDelete />
                        </IconButton>
                      }
                    >
                      <BasicTextField
                        className="damage-field"
                        label="Damage"
                        value={damage.damage}
                        onChange={(newVal) =>
                          updateDamageItem({ ...damage, damage: newVal }, i)
                        }
                      />
                      <BasicTextField
                        className="damage-dice-field"
                        label="Damage Dice"
                        value={damage.damageDice}
                        onChange={(newVal) =>
                          updateDamageItem({ ...damage, damageDice: newVal }, i)
                        }
                      />
                      <BasicSelectField
                        id={`damage-${i}-type`}
                        className="damage-type-field"
                        label="Damage Type"
                        options={DamageTypeSelectOptions}
                        value={damage.type}
                        onChange={(newVal: DamageType) =>
                          updateDamageItem({ ...damage, type: newVal }, i)
                        }
                      />
                    </ListItem>
                  ))}
                  <ListItem className="pl-0">
                    <ListItemButton
                      onClick={() =>
                        setAction((prev) => ({
                          ...prev,
                          damage: [
                            ...prev.damage,
                            {
                              id: undefined,
                              damage: '',
                              damageDice: '',
                              type: 'Non-Magical',
                            },
                          ],
                        }))
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
