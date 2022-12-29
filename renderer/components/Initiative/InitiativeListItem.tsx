import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { cyan, grey, red } from '@mui/material/colors';
import { styled } from '@mui/system';
import clsx from 'clsx';
import DeadIcon from 'components/Icons/DeadIcon';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import { FC } from 'react';
import { MdDoubleArrow } from 'react-icons/md';

import CombatantOptions from './CombatantOptions';

type Props = {
  combatant: Combatant;
  isActive: boolean;
  onFlag: (id: string, isDead: boolean) => void;
  onClick: (combatant: Combatant) => void;
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
    '& .MuiListItemIcon-root': {
      marginRight: '12px',
      minWidth: 0,
    },
  },
}));

const InitiativeListItem: FC<Props> = ({
  combatant,
  isActive,
  onFlag,
  onClick,
}) => {
  const { id, name, isPlayer, initiative, initiativeModifier, isDead } =
    combatant;

  return (
    <StyledListItem
      disableGutters
      className={clsx({
        active: isActive,
        'is-player': isPlayer,
        'is-dead': isDead,
      })}
      secondaryAction={
        <CombatantOptions isDead={isDead} onFlag={(flag) => onFlag(id, flag)} />
      }
    >
      <ListItemButton onClick={() => onClick(combatant)}>
        {isActive && (
          <ListItemIcon>
            <MdDoubleArrow />
          </ListItemIcon>
        )}
        {isDead && (
          <ListItemIcon>
            <DeadIcon />
          </ListItemIcon>
        )}
        <ListItemText
          primary={name}
          secondary={`Initiative: ${initiative} (${initiativeModifier})`}
        />
      </ListItemButton>
    </StyledListItem>
  );
};

export default InitiativeListItem;
