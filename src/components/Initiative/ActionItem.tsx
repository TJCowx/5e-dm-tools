import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Action from 'models/creature/Action';

type Props = {
  action: Action;
};

const Container = styled('div')(() => ({}));

function ActionItem({ action }: Props) {
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

  const damageString = (damage ?? []).map(
    (damageItem) =>
      `${damageItem?.defaultDamage} (${damageItem?.dice}) ${damageItem?.type?.name} damage`
  );

  return (
    <Container>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">
        {isAttack &&
          `${attackDelivery?.name} ${
            attackType?.name
          } Attack: +${toHit}, reach ${reach}ft., ${combatantsHit} target, Hit: ${damageString.join(
            ', '
          )}\n`}
        {description}
      </Typography>
    </Container>
  );
}

export default ActionItem;
