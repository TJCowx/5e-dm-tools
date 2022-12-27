import { ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import clsx from 'clsx';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import { FC } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

type Props = {
  combatant: Combatant;
  isActive: boolean;
};

const StyledListItem = styled(ListItem)(() => ({}));

const InitiativeListItem: FC<Props> = ({ combatant, isActive }) => {
  const { name, isPlayer, initiative } = combatant;

  return (
    <StyledListItem
      className={clsx({
        active: isActive,
        'is-player': isPlayer,
      })}
    >
      {isActive && (
        <ListItemIcon>
          <DoubleArrowIcon />
        </ListItemIcon>
      )}
      <ListItemText primary={name} secondary={`Initiative: ${initiative}`} />
    </StyledListItem>
  );
};

export default InitiativeListItem;
