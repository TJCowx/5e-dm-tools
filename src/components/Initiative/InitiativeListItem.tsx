import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem, ListItemButton, ListItemIcon, styled } from '@mui/material';
import { cyan, grey, red } from '@mui/material/colors';
import clsx from 'clsx';
import DeadIcon from 'components/Icons/DeadIcon';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import CombatantOptions from './CombatantOptions';

type Props = {
  combatant: Combatant;
  isActive: boolean;
  onFlag: (id: string, isDead: boolean) => void;
  onClick: (combatant: Combatant) => void;
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&.active': {
    background: red[50],
    '&.is-player': {
      background: cyan[50],
    },
  },
  '&.is-dead': {
    background:
      theme.palette.mode === 'light' ? grey[300] : 'rgba(255, 255, 255, 0.12)',
    color: theme.palette.text.disabled,
    '& .secondary-text': {
      color: theme.palette.text.disabled,
    },
    '& .MuiListItemIcon-root': {
      marginRight: '12px',
      minWidth: 0,
    },
  },
}));

function InitiativeListItem({ combatant, isActive, onFlag, onClick }: Props) {
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
            <FontAwesomeIcon icon={faAnglesRight} />
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
}

export default InitiativeListItem;
