import { Button, Divider, List, ListSubheader } from '@mui/material';
import { styled } from '@mui/system';
import AddCombatant from 'components/Initiative/AddCombatant';
import InitiativeListItem from 'components/Initiative/InitiativeListItem';
import Layout from 'components/Layout/Layout';
import orderBy from 'lodash.orderby';
import Combatant from 'models/initiative/Combatant';
import { FC, Fragment, useState } from 'react';
import { getCombatantName } from 'utils/monsterUtils';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

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

const MonsterContainer = styled('div')(() => ({
  padding: '12px',
  flexGrow: 1,
}));

const findNextInitiative = (currentIndex: number, combatants: Combatant[]) => {
  let nextIndex = currentIndex === combatants.length - 1 ? 0 : currentIndex + 1;
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

  return nextIndex;
};

const InitiativePage: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeMonsters, setActiveMonsters] = useState<Combatant[]>([]);
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [activeId, setActiveId] = useState<string>(null);

  const startInitiative = () => {
    setActiveId(combatants[0].id);
    setHasStarted(true);
  };

  const nextInitiative = () => {
    const combatIndex = combatants.findIndex((c) => c.id === activeId);
    setActiveId(combatants[findNextInitiative(combatIndex, combatants)].id);
  };

  const addCombatants = (addedCombatants: Combatant[]) => {
    const newCombatants = [...combatants, ...addedCombatants];

    const prevCombatants: Map<string, number> = new Map<string, number>();

    const orderedCombatants = orderBy(
      newCombatants,
      ['initiative', 'initiativeModifier', 'name'],
      ['desc', 'desc', 'asc']
    );

    const renamedCombatants = orderedCombatants.map((combatant) => {
      if (combatant.isPlayer) return combatant;

      if (!prevCombatants.has(combatant.monsterStats.id))
        prevCombatants.set(combatant.monsterStats.id, 0);

      const numPrev = prevCombatants.get(combatant.monsterStats.id);

      prevCombatants.set(combatant.monsterStats.id, numPrev + 1);

      return {
        ...combatant,
        name: getCombatantName(combatant.monsterStats.name, numPrev),
      };
    });

    setCombatants(renamedCombatants);
  };

  const toggleAliveState = (id: string, newState: boolean) => {
    setCombatants((prev) =>
      prev.map((combatant) =>
        combatant.id === id
          ? {
              ...combatant,
              isDead: newState,
            }
          : combatant
      )
    );
  };

  return (
    <Layout title="Initiative" disablePadding>
      <PageContainer>
        <InitiativeContainer>
          <List
            className="scroll-enabled"
            dense
            subheader={<ListSubheader>Initiative</ListSubheader>}
          >
            {combatants.map((c) => (
              <Fragment key={c.id}>
                <InitiativeListItem
                  combatant={c}
                  isActive={c.id === activeId}
                  onFlag={toggleAliveState}
                />
                <Divider />
              </Fragment>
            ))}
          </List>
          <div className="action-container">
            <Button
              variant="contained"
              onClick={hasStarted ? nextInitiative : startInitiative}
            >
              {hasStarted ? 'Next' : 'Start'}
            </Button>
          </div>
        </InitiativeContainer>
        <MonsterContainer className="scroll-enabled">
          <AddCombatant onAddCombatants={addCombatants} />
        </MonsterContainer>
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
