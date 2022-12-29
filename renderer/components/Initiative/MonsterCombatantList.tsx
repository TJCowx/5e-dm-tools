import { Accordion, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/system';
import Combatant from 'models/initiative/Combatant';
import { FC, useMemo, useState } from 'react';
import MonsterCombatantItem from './MonsterCombatantItem';

type Props = {
  combatants: Map<string, Combatant>;
};

const MonsterContainer = styled('div')(() => ({
  flexGrow: 1,
  paddingBottom: '44px',
}));

const MonsterCombatantList: FC<Props> = ({ combatants }) => {
  const [expandedItem, setExpandedItem] = useState('');

  const combatantsList = useMemo(
    () => Array.from(combatants.values()),
    [combatants]
  );

  const handleChange = (clickedPanel: string) => {
    setExpandedItem(clickedPanel === expandedItem ? '' : clickedPanel);
  };

  return (
    <MonsterContainer id="monster-container" className="scroll-enabled">
      <div>
        {combatantsList.map((combatant) => (
          <MonsterCombatantItem
            key={combatant.id}
            combatant={combatant}
            isExpanded={expandedItem === `panel-${combatant.id}`}
            onChange={() => handleChange(`panel-${combatant.id}`)}
          />
        ))}
      </div>
    </MonsterContainer>
  );
};

export default MonsterCombatantList;
