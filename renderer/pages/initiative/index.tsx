import { styled } from '@mui/system';
import AddCombatant from 'components/Initiative/AddCombatant';
import InitiativeList from 'components/Initiative/InitiativeList';
import MonsterCombatantList from 'components/Initiative/MonsterCombatantList';
import Layout from 'components/Layout/Layout';
import Combatant from 'models/initiative/Combatant';
import { FC, useRef, useState } from 'react';
import { getCombatantName } from 'utils/monsterUtils';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

const InitiativePage: FC = () => {
  const [monsterCombatants, setMonsterCombatants] = useState(
    new Map<string, Combatant>([])
  );
  const [combatants, setCombatants] = useState(new Map<string, Combatant>());

  const addCombatants = (addedCombatants: Combatant[]) => {
    const numCombatantsByMonsterType = new Map<string, number>();

    // Previous named combatants
    const updatedCombatants = new Map(combatants);
    const updatedMonsterCombatants = new Map(monsterCombatants);

    // Count number of previously named combatants
    Array.from(combatants.values()).forEach(({ isPlayer, monsterStats }) => {
      if (isPlayer) return;

      if (!numCombatantsByMonsterType.has(monsterStats.id)) {
        numCombatantsByMonsterType.set(monsterStats.id, 0);
      }

      const prev = numCombatantsByMonsterType.get(monsterStats.id);
      numCombatantsByMonsterType.set(monsterStats.id, prev + 1);
    });

    // Rename any other previous combatants
    addedCombatants.forEach((combatant) => {
      const copyCombatant = combatant;
      const { id, monsterStats, isPlayer } = copyCombatant;

      if (!isPlayer) {
        if (!numCombatantsByMonsterType.has(monsterStats.id)) {
          numCombatantsByMonsterType.set(monsterStats.id, 0);
        }

        const numPrev = numCombatantsByMonsterType.get(monsterStats.id);

        copyCombatant.name = getCombatantName(monsterStats.name, numPrev);

        numCombatantsByMonsterType.set(monsterStats.id, numPrev + 1);

        updatedMonsterCombatants.set(id, copyCombatant);
      }

      updatedCombatants.set(id, copyCombatant);
    });

    setCombatants(updatedCombatants);
    setMonsterCombatants(updatedMonsterCombatants);
  };

  const toggleAliveState = (id: string, newState: boolean) => {
    const prevCombatants = new Map(combatants);
    prevCombatants.get(id).isDead = newState;
    setCombatants(prevCombatants);
  };

  const highlightMonsterCombatant = (combatant: Combatant) => {
    if (combatant.isPlayer) return;

    const monsterPanel = document.getElementById(
      `panel-${combatant.id}-header`
    );

    // Expand it if it isn't already expanded
    if (!monsterPanel.classList.contains('Mui-expanded')) {
      monsterPanel.click();
    }

    monsterPanel.scrollIntoView();
  };

  return (
    <Layout title="Initiative" disablePadding contentFillPage>
      <PageContainer>
        <InitiativeList
          combatants={combatants}
          onCombatantAliveToggle={toggleAliveState}
          onCombatantClick={highlightMonsterCombatant}
        />
        <MonsterCombatantList combatants={monsterCombatants} />
        <AddCombatant onAddCombatants={addCombatants} />
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
