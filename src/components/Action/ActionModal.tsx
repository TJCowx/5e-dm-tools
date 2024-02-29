import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { ValidationError } from 'yup';

import {
  BasicNumberField,
  BasicSwitchField,
  BasicTextField,
  LazySelectField,
} from '@components/Fields/Basic';
import { Modal } from '@components/Modal';
import Action from '@models/creature/Action';
import Damage from '@models/creature/Damage';

import { SCHEMA } from './constants';
import DamageListItem from './DamageListItem';

type Props = {
  initialAction?: Partial<Action>;
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Partial<Action>) => void;
  onClose: () => void;
};

type ErrorSchema = Record<keyof Action, string | null>;

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
  damages: [],
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

  const damageListRef = useRef<HTMLUListElement | null>(null);

  const attackTypeParams = useMemo(
    () => ({
      hasLegendary: isLegendary,
      hasLair,
    }),
    [isLegendary, hasLair],
  );

  const handleClose = () => {
    setErrors({});
    setAction(newAction);
    onClose();
  };

  const onSubmit = () => {
    SCHEMA.validate(action, { abortEarly: false })
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

  const updateDamageItem = (damage: Partial<Damage>, i: number) => {
    const arrCopy = action?.damages ?? [];

    arrCopy[i] = damage;
    setAction((prev) => ({ ...prev, damage: arrCopy }));
  };

  const removeDamageItem = (i: number) => {
    const arrCopy = action?.damages ?? [];
    arrCopy.splice(i, 1);
    setAction((prev) => ({ ...prev, damage: arrCopy }));
  };

  const addNewDamage = () => {
    setAction((prev) => ({
      ...prev,
      damages: [
        ...(prev.damages ?? []),
        {
          defaultDamage: 0,
          dice: '',
          typeId: null,
        },
      ],
    }));

    setTimeout(() => {
      if (damageListRef.current) {
        const damageItems =
          damageListRef.current.querySelectorAll<HTMLInputElement>(
            '.damage-list-item .damage-field input',
          );

        if (damageItems.length) {
          damageItems[damageItems.length - 1].focus();
        }
      }
    }, 1);
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
          value={action.actionTypeId ? `${action.actionTypeId}` : null}
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
                value={
                  action.attackDeliveryId ? `${action.attackDeliveryId}` : null
                }
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
              <LazySelectField
                id="attack-type-field"
                label="Attack Type"
                value={action.attackTypeId ? `${action.attackTypeId}` : null}
                error={errors.actionTypeId}
                queryArgs={{
                  queryName: 'get_all_attack_types',
                  textKey: 'name',
                  valueKey: 'id',
                }}
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
            {!!errors.damages?.length && (
              <Alert
                severity="error"
                sx={{ marginTop: '12px', marginBottom: '12px' }}>
                {errors.damages}
              </Alert>
            )}
            <List ref={damageListRef} dense>
              {(action.damages ?? []).map((damage, i) => (
                <DamageListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={`damage-${i}`}
                  damage={damage}
                  updateDamageItem={(newVal) => updateDamageItem(newVal, 1)}
                  removeDamageItem={() => removeDamageItem(i)}
                />
              ))}
              <ListItem className="pl-0">
                <ListItemButton onClick={addNewDamage}>
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
            onClick={onSubmit}>
            Save
          </Button>
        </div>
      </StyledForm>
    </Modal>
  );
}

export default ActionModal;
