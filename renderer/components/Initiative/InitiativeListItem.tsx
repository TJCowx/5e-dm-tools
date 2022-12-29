import { ListItem, ListItemIcon } from '@mui/material';
import { cyan, grey, red } from '@mui/material/colors';
import { styled } from '@mui/system';
import clsx from 'clsx';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import { FC } from 'react';
import { GiDeathSkull } from 'react-icons/gi';
import { MdDoubleArrow } from 'react-icons/md';

import CombatantOptions from './CombatantOptions';

type Props = {
  combatant: Combatant;
  isActive: boolean;
  onFlag: (id: string, isDead: boolean) => void;
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

const InitiativeListItem: FC<Props> = ({ combatant, isActive, onFlag }) => {
  const { id, name, isPlayer, initiative, initiativeModifier, isDead } =
    combatant;

  return (
    <StyledListItem
      className={clsx({
        active: isActive,
        'is-player': isPlayer,
        'is-dead': isDead,
      })}
      secondaryAction={
        <CombatantOptions isDead={isDead} onFlag={(flag) => onFlag(id, flag)} />
      }
    >
      {isActive && (
        <ListItemIcon>
          <MdDoubleArrow />
        </ListItemIcon>
      )}
      {isDead && (
        <ListItemIcon>
          <GiDeathSkull color="warning" />
        </ListItemIcon>
      )}
      <ListItemText
        primary={name}
        secondary={`Initiative: ${initiative} (${initiativeModifier})`}
      />
    </StyledListItem>
  );
};

export default InitiativeListItem;
