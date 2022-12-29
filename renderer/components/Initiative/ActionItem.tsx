import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Action from 'models/monster/Action';
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
    reach,
  } = action;

  return (
    <Container>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">
        {isAttack &&
          `${attackDelivery} ${attackType} Attack: +${toHit}, reach ${reach}ft., NUM_TARGETS, Hit: TODO\n`}
        {description}
      </Typography>
    </Container>
  );
};

export default ActionItem;
