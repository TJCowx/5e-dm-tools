import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Typography } from '@mui/material';
import EditActionButton from 'components/Action/EditActionButton';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import Action from 'models/creature/Action';
import { FC } from 'react';

type Props = {
  action: Action;
  isLegendary: boolean;
  hasLair: boolean;
  onEdit: (action: Action) => void;
  onDelete: (id: string) => void;
};

const ActionListItem: FC<Props> = ({
  action,
  isLegendary,
  hasLair,
  onEdit,
  onDelete,
}) => {
  const {
    id,
    name,
    description,
    actionType,
    isAttack,
    attackDelivery,
    attackType,
    toHit,
    damage,
    reach,
    combatantsHit,
  } = action;

  const damageText = (damage ?? [])
    .map((dmg) => `${dmg.damage} ${dmg.type} damage`)
    .join(', ');

  const attackDescription = isAttack
    ? ` - ${attackDelivery} ${attackType} Attack | +${toHit} to hit | Reach ${reach}ft | ${damageText} | ${combatantsHit} target`
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
            onClick={() => onDelete(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography variant="body2">
              {actionType}
              {attackDescription}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </>
        }
      />
    </ListItemTwoSecondaryActions>
  );
};

export default ActionListItem;
