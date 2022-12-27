import { ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import clsx from 'clsx';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import { FC } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { red, cyan, grey } from '@mui/material/colors';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

type Props = {
  combatant: Combatant;
  isActive: boolean;
};

const StyledListItem = styled(ListItem)(() => ({
  '&.active': {
    background: red[50],
    '&.is-player': {
      background: cyan[50],
    },
  },
  '&.is-dead': {
    background: grey[300],
  },
}));

const InitiativeListItem: FC<Props> = ({ combatant, isActive }) => {
  const { name, isPlayer, initiative, isDead } = combatant;

  return (
    <StyledListItem
      className={clsx({
        active: isActive,
        'is-player': isPlayer,
        'is-dead': isDead,
      })}
    >
      {isActive && (
        <ListItemIcon>
          <DoubleArrowIcon />
        </ListItemIcon>
      )}
      {isDead && (
        <ListItemIcon>
          <DoNotDisturbIcon />
        </ListItemIcon>
      )}
      <ListItemText primary={name} secondary={`Initiative: ${initiative}`} />
    </StyledListItem>
  );
};

export default InitiativeListItem;
