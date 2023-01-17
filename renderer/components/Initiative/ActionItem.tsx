import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Action from 'models/creature/Action';
import { FC } from 'react';

type Props = {
  action: Action;
};

const Container = styled('div')(() => ({}));

const ActionItem: FC<Props> = ({ action }) => {
  const {
    name,
    description,
    isAttack,
    attackDelivery,
    attackType,
    toHit,
    damage,
    combatantsHit,
    reach,
  } = action;

  const damageString = damage.map(
    (damageItem) =>
      `${damageItem.damage} (${damageItem.damageDice}) ${damageItem.type} damage`
  );

  return (
    <Container>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">
        {isAttack &&
          `${attackDelivery} ${attackType} Attack: +${toHit}, reach ${reach}ft., ${combatantsHit} target, Hit: ${damageString.join(
            ', '
          )}\n`}
        {description}
      </Typography>
    </Container>
  );
};

export default ActionItem;
