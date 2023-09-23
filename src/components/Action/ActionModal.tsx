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
import LazySelectField from 'components/Fields/Basic/LazySelectField';
import ListItemText from 'components/List/ListItemText';
import Modal from 'components/Modal/Modal';
import Action from 'models/creature/Action';
import { AttackTypeSelectOptions } from 'models/creature/AttackType';
import Damage from 'models/creature/Damage';
import DamageType from 'models/creature/DamageType';
import { useMemo, useState } from 'react';
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
  initialAction?: Partial<Action>;
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Partial<Action>) => void;
  onClose: () => void;
};

type ErrorSchema = Record<keyof Action, string | null>;

const schema = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString().required({
    field: 'description',
    message: RequireMessage,
  }),
  actionTypeId: yupNumber().nullable().required({
    field: 'actionTypeId',
    message: RequireMessage,
  }),
  isAttack: yupBoolean(),
  attackDeliveryId: yupNumber()
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupString().required({
          field: 'attackDeliveryId',
          message: RequireMessage,
        }),
    }),
  attackTypeId: yupNumber()
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupString().required({
          field: 'attackTypeId',
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

const newAction: Partial<Action> = {
  name: '',
  description: '',
  actionTypeId: null,
  isAttack: false,
  attackDeliveryId: null,
  attackTypeId: null,
  combatantsHit: 0,
  toHit: 0,
  damage: [],
  reach: 5,
};

function ActionModal({
  initialAction = newAction,
  isLegendary,
  hasLair,
  onSave,
  onClose,
}: Props) {
  const [action, setAction] = useState<Partial<Action>>(initialAction);
  const [errors, setErrors] = useState<Partial<ErrorSchema>>({});

  const attackTypeParams = useMemo(
    () => ({
      hasLegendary: isLegendary,
      hasLair,
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
          value={action.name as string}
          className="mb-16"
          label="Name"
          error={errors.name}
          onChange={(newVal) =>
            setAction((prev) => ({ ...prev, name: newVal }))
          }
          onBlur={() => setErrors((prev) => ({ ...prev, name: null }))}
        />
        <BasicTextField
          value={action.description as string}
          className="mb-16"
          label="Description"
          isMultiline
          error={errors.description}
          onChange={(newVal) =>
            setAction((prev) => ({ ...prev, description: newVal }))
          }
          onBlur={() => setErrors((prev) => ({ ...prev, description: null }))}
        />
        <LazySelectField
          id="action-type-field"
          value={`${action.actionTypeId}`}
          className="mb-16"
          label="Action Type"
          error={errors.actionTypeId}
          queryArgs={{
            queryName: 'get_all_action_types',
            textKey: 'name',
            valueKey: 'id',
          }}
          queryParams={attackTypeParams}
          onChange={(newVal) =>
            setAction((prev) => ({
              ...prev,
              actionTypeId: newVal != null ? +newVal : null,
            }))
          }
          onBlur={() =>
            setErrors((prev) => ({ ...prev, actionType: undefined }))
          }
        />
        <BasicSwitchField
          value={action.isAttack as boolean}
          className="mb-16"
          label="Is Attack"
          onChange={(isChecked) =>
            setAction((prev) => ({ ...prev, isAttack: isChecked }))
          }
        />
        {action.isAttack && (
          <>
            <div className="grid mb-16">
              <LazySelectField
                id="attack-delivery-field"
                value={`${action.attackDeliveryId}`}
                label="Attack Delivery"
                error={errors.attackDeliveryId}
                queryArgs={{
                  queryName: 'get_all_attack_deliveries',
                  textKey: 'name',
                  valueKey: 'id',
                }}
                onChange={(newVal) =>
                  setAction((prev) => ({
                    ...prev,
                    attackDeliveryId: newVal != null ? +newVal : null,
                  }))
                }
                onBlur={() =>
                  setErrors((prev) => ({ ...prev, attackDelivery: undefined }))
                }
              />
              <BasicSelectField
                id="attack-type-field"
                label="Attack Type"
                value={`${action.attackTypeId}`}
                error={errors.actionTypeId}
                options={AttackTypeSelectOptions}
                onChange={(newVal) =>
                  setAction((prev) => ({
                    ...prev,
                    attackTypeId: newVal != null ? +newVal : null,
                  }))
                }
                onBlur={() =>
                  setErrors((prev) => ({ ...prev, attackType: undefined }))
                }
              />
            </div>
            <div className="grid mb-16">
              <BasicNumberField
                value={action.toHit ?? null}
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
                value={action.reach ?? null}
                label="Reach"
                min={0}
                step={5}
                error={errors.reach}
                onChange={(newVal) =>
                  setAction((prev) => ({
                    ...prev,
                    reach: newVal == null ? null : newVal,
                  }))
                }
                onBlur={() => setErrors((prev) => ({ ...prev, reach: null }))}
              />
              <BasicNumberField
                value={action.combatantsHit ?? null}
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
                    value={damage.defaultDamage ?? null}
                    onChange={(newVal) =>
                      updateDamageItem({ ...damage, defaultDamage: newVal }, i)
                    }
                  />
                  <BasicTextField
                    className="damage-dice-field"
                    label="Damage Dice"
                    value={damage.dice}
                    onChange={(newVal) =>
                      updateDamageItem({ ...damage, dice: newVal }, i)
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
}

export default ActionModal;
