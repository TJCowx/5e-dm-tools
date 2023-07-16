import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import Action from 'models/creature/Action';
import ActionType, {
  ActionTypeSelectOptions,
} from 'models/creature/ActionType';
import {
  AttackDelivery,
  AttackDeliverySelectOptions,
  AttackType,
  AttackTypeSelectOptions,
} from 'models/creature/AttackType';
import Damage from 'models/creature/Damage';
import DamageType, {
  DamageTypeSelectOptions,
} from 'models/creature/DamageType';
import { FC, useMemo, useState } from 'react';
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
  initialAction?: Action;
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Action) => void;
  onClose: () => void;
};

type ErrorSchema = Record<keyof Action, string | null>;

const schema = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString().required({
    field: 'description',
    message: RequireMessage,
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
      then: () =>
        yupString().required({
          field: 'attackDelivery',
          message: RequireMessage,
        }),
    }),
  attackType: yupString()
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupString().required({
          field: 'attackType',
          message: RequireMessage,
        }),
    }),
  toHit: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
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
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
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
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
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

const newAction: Action = {
  name: '',
  description: '',
  actionType: null,
  isAttack: false,
  attackDelivery: null,
  attackType: null,
  combatantsHit: 0,
  toHit: 0,
  damage: [],
  reach: 5,
};

const ActionModal: FC<Props> = ({
  initialAction = newAction,
  isLegendary,
  hasLair,
  onSave,
  onClose,
}) => {
  const [action, setAction] = useState<Action>(initialAction);
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
    setErrors({});
    // setAction(newAction());
    onClose();
  };

  const onSubmit = () => {
    schema
      .validate(action, { abortEarly: false })
      .then(() => {
        onSave(action);
        onClose();
      })
      .catch((e: ValidationError) => {
        const newErrors: Partial<ErrorSchema> = {};

        // Casting because `e.errors` is incorrectly types `string[]`
        (
          e.errors as unknown as { field: keyof Action; message: string }[]
        ).forEach(({ field, message }) => {
          newErrors[field] = message;
        });

        setErrors(newErrors);
      });
  };

  const updateDamageItem = (damage: Damage, i: number) => {
    const arrCopy = action.damage ?? [];

    arrCopy[i] = damage;
    setAction((prev) => ({ ...prev, damage: arrCopy }));
  };

  const removeDamageItem = (i: number) => {
    const arrCopy = action.damage ?? [];
    arrCopy.splice(i, 1);
    setAction((prev) => ({ ...prev, damage: arrCopy }));
  };

  return (
    <Modal title="Add Action" isOpen onClose={handleClose}>
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
          onBlur={() => setErrors((prev) => ({ ...prev, description: null }))}
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
            setErrors((prev) => ({ ...prev, actionType: undefined }))
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
                  setErrors((prev) => ({ ...prev, attackDelivery: undefined }))
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
                  setErrors((prev) => ({ ...prev, attackType: undefined }))
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
                  setErrors((prev) => ({ ...prev, toHit: undefined }))
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
                  setErrors((prev) => ({ ...prev, reach: undefined }))
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
                  setErrors((prev) => ({ ...prev, combatantsHit: undefined }))
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
              {(action.damage ?? []).map((damage, i) => (
                <ListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={`damage-${i}`}
                  className="damage-list-item pl-0"
                  secondaryAction={
                    <IconButton
                      onClick={() => removeDamageItem(i)}
                      color="warning"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
                        ...(prev.damage ?? []),
                        {
                          damage: '',
                          damageDice: '',
                          type: 'Non-Magical',
                        },
                      ],
                    }))
                  }
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faPlus} />
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
  );
};

export default ActionModal;
