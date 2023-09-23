import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Typography } from '@mui/material';
import EditActionButton from 'components/Action/EditActionButton';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import useInvoke from 'hooks/useInvoke';
import Action from 'models/creature/Action';
import ActionType from 'models/creature/ActionType';
import { AttackDelivery, AttackType } from 'models/creature/AttackType';
import Damage from 'models/creature/Damage';
import DamageType from 'models/creature/DamageType';

type Props = {
  action: Partial<Action>;
  isLegendary?: boolean;
  hasLair?: boolean;
  onEdit: (action: Partial<Action>) => void;
  onDelete: (id: string) => void;
};

const mapDamageIds = (damage: Partial<Damage>[]) =>
  damage?.reduce<number[]>((acc, dmg) => {
    if (dmg?.typeId) acc.push(dmg.typeId);
    return acc;
  }, []);

function ActionListItem({
  action,
  isLegendary = false,
  hasLair = false,
  onEdit,
  onDelete,
}: Props) {
  // These invoke spams are horrid, but I don't want to refactor everything when I'm going to migrate to svelte
  const { data: damageTypes } = useInvoke<DamageType[]>(
    'get_damage_types_by_ids',
    {
      ids: mapDamageIds(action.damage ?? []),
    }
  );

  const { data: attackDelivery } = useInvoke<AttackDelivery>(
    'get_attack_delivery_by_id',
    {
      id: action.attackDeliveryId as number,
    }
  );

  const { data: attackType } = useInvoke<AttackType>('get_attack_type_by_id', {
    id: action.attackDeliveryId as number,
  });

  const { data: actionType } = useInvoke<ActionType>('get_action_type_by_id', {
    id: action.actionTypeId as number,
  });

  const {
    id,
    name,
    description,
    isAttack,
    toHit,
    damage,
    reach,
    combatantsHit,
  } = action;

  const damageText = (damage ?? [])
    .map(
      (dmg) =>
        `${dmg.defaultDamage} ${
          damageTypes?.find((type) => type.id === dmg.typeId)?.name
        } damage`
    )
    .join(', ');

  const attackDescription = isAttack
    ? ` - ${attackDelivery?.name} ${attackType?.name} Attack | +${toHit} to hit | Reach ${reach}ft | ${damageText} | ${combatantsHit} target`
    : '';

  return (
    <ListItemTwoSecondaryActions
      secondaryAction={
        <>
          <EditActionButton
            action={action}
            isLegendary={isLegendary}
            hasLair={hasLair}
            onSave={onEdit}
          />
          <IconButton
            aria-label={`Delete ${name}`}
            edge="end"
            color="warning"
            onClick={() => onDelete(`${id}`)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={name ?? ''}
        secondary={
          <>
            <Typography variant="body2">
              {actionType?.name}
              {attackDescription}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </>
        }
      />
    </ListItemTwoSecondaryActions>
  );
}

export default ActionListItem;
