import { IconButton, Typography } from '@mui/material';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import Action from 'models/monster/Action';
import { FC } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

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
  } = action;

  const damageText = (damage ?? [])
    .map((dmg) => `${dmg.damage} ${dmg.type} damage`)
    .join(', ');

  const attackDescription = isAttack
    ? ` - ${attackDelivery} ${attackType} Attack | +${toHit} to hit | Reach ${reach}ft | ${damageText}`
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
            <MdEdit />
          </IconButton>
          <IconButton
            aria-label={`Delete ${name}`}
            edge="end"
            color="warning"
            onClick={() => onDelete(id)}
          >
            <MdDelete />
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
