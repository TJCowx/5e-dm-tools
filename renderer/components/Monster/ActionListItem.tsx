import { ListItem, Typography } from '@mui/material';
import ListItemText from 'components/List/ListItemText';
import Action from 'models/monster/Action';
import { FC } from 'react';

type Props = {
  action: Action;
};

const ActionListItem: FC<Props> = ({ action }) => {
  const {
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
    <ListItem>
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
    </ListItem>
  );
};

export default ActionListItem;
