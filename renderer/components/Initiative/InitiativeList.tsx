import styled from '@emotion/styled';
import { Button, List, ListSubheader } from '@mui/material';
import orderBy from 'lodash.orderby';
import Combatant from 'models/initiative/Combatant';
import { FC, Fragment, useMemo, useState } from 'react';

import InitiativeListItem from './InitiativeListItem';

type Props = {
  combatants: Map<string, Combatant>;
  onCombatantAliveToggle: (id: string, isAlive: boolean) => void;
};

const InitiativeContainer = styled('div')(() => ({
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  minWidth: '250px',
  maxWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiList-root': { flexGrow: 1 },
  '& .action-container': {
    padding: '4px',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    flexShrink: 1,
    '& button': {
      width: '100%',
    },
  },
}));

const findNextCombatant = (
  currentIndex: number,
  initiativeOrder: Combatant[],
  combatants: Map<string, Combatant>
) => {
  let nextIndex =
    currentIndex === initiativeOrder.length - 1 ? 0 : currentIndex + 1;
  let foundAvailable = false;

  while (nextIndex !== currentIndex && !foundAvailable) {
    const nextCombatant = combatants[nextIndex];

    if (!nextCombatant) {
      nextIndex = 0;
    } else if (nextCombatant.isDead) {
      nextIndex += 1;
    } else {
      foundAvailable = true;
    }
  }

  return combatants[nextIndex];
};

const InitiativeList: FC<Props> = ({ combatants, onCombatantAliveToggle }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeId, setActiveId] = useState<string>(null);

  const order = useMemo(
    () =>
      orderBy(
        Array.from(combatants.values()),
        ['initiative', 'initiativeModifier', 'name'],
        ['desc', 'desc', 'asc']
      ),
    [combatants]
  );

  const startInitiative = () => {
    setActiveId(order[0].id);
    setHasStarted(true);
  };

  /** Highlight the next active combatant in the initiative order */
  const nextInitiative = () => {
    const currentIndex = order.findIndex(({ id }) => id === activeId);

    setActiveId(findNextCombatant(currentIndex, order, combatants).id);
  };

  return (
    <InitiativeContainer>
      <List
        className="scroll-enabled"
        dense
        subheader={<ListSubheader>Initiative</ListSubheader>}
      >
        {order.map((combatant) => (
          <Fragment key={combatant.id}>
            <InitiativeListItem
              combatant={combatant}
              isActive={combatant.id === activeId}
              onFlag={onCombatantAliveToggle}
            />
          </Fragment>
        ))}
      </List>
      <div className="action-container">
        <Button
          variant="contained"
          disabled={combatants.size <= 1}
          onClick={hasStarted ? nextInitiative : startInitiative}
        >
          {hasStarted ? 'Next' : 'Start'}
        </Button>
      </div>
    </InitiativeContainer>
  );
};

export default InitiativeList;
