import { Accordion, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/system';
import Combatant from 'models/initiative/Combatant';
import { FC, useMemo } from 'react';
import MonsterCombatantItem from './MonsterCombatantItem';

type Props = {
  combatants: Map<string, Combatant>;
};

const MonsterContainer = styled('div')(() => ({
  flexGrow: 1,
}));

const MonsterCombatantList: FC<Props> = ({ combatants }) => {
  const combatantsList = useMemo(
    () => Array.from(combatants.values()),
    [combatants]
  );

  return (
    <MonsterContainer id="monster-container" className="scroll-enabled">
      <div>
        {combatantsList.map((combatant) => (
          <MonsterCombatantItem key={combatant.id} combatant={combatant} />
        ))}
      </div>
    </MonsterContainer>
  );
};

export default MonsterCombatantList;
