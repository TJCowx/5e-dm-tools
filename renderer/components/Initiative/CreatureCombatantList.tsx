import { styled } from '@mui/system';
import Combatant from 'models/initiative/Combatant';
import { FC, useMemo, useState } from 'react';

import CreatureCombatantItem from './CreatureCombatantItem';

type Props = {
  combatants: Map<string, Combatant>;
};

const CreatureContainer = styled('div')(() => ({
  flexGrow: 1,
  paddingBottom: '44px',
}));

const CreatureCombatantList: FC<Props> = ({ combatants }) => {
  const [expandedItem, setExpandedItem] = useState('');

  const combatantsList = useMemo(
    () => Array.from(combatants.values()),
    [combatants]
  );

  const handleChange = (clickedPanel: string) => {
    setExpandedItem(clickedPanel === expandedItem ? '' : clickedPanel);
  };

  return (
    <CreatureContainer id="creature-container" className="scroll-enabled">
      <div>
        {combatantsList.map((combatant) => (
          <CreatureCombatantItem
            key={combatant.id}
            combatant={combatant}
            isExpanded={expandedItem === `panel-${combatant.id}`}
            onChange={() => handleChange(`panel-${combatant.id}`)}
          />
        ))}
      </div>
    </CreatureContainer>
  );
};

export default CreatureCombatantList;
