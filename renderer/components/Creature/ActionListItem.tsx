import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Typography } from '@mui/material';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import Action from 'models/creature/Action';
import { FC } from 'react';

type Props = {
  action: Action;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ActionListItem: FC<Props> = ({ action, onEdit, onDelete }) => {
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
          <IconButton
            aria-label={`Edit ${name}`}
            edge="end"
            onClick={() => onEdit(id)}
          >
            <FontAwesomeIcon icon={faPen} />
          </IconButton>
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
