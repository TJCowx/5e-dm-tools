import { styled } from '@mui/system';
import AddCombatant from 'components/Initiative/AddCombatant';
import InitiativeList from 'components/Initiative/InitiativeList';
import Layout from 'components/Layout/Layout';
import Combatant from 'models/initiative/Combatant';
import { FC, useState } from 'react';
import { getCombatantName } from 'utils/monsterUtils';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

const MonsterContainer = styled('div')(() => ({
  padding: '12px',
  flexGrow: 1,
}));

const InitiativePage: FC = () => {
  const [monsterCombatants, setMonsterCombatants] = useState<string[]>([]);
  const [combatants, setCombatants] = useState(new Map<string, Combatant>());

  const addCombatants = (addedCombatants: Combatant[]) => {
    const numCombatantsByMonsterType = new Map<string, number>();

    // Previous named combatants
    const updatedCombatants = new Map(combatants);

    // Count number of previously named combatants
    Array.from(combatants.values()).forEach(({ monsterStats }) => {
      if (!numCombatantsByMonsterType.has(monsterStats.id)) {
        numCombatantsByMonsterType.set(monsterStats.id, 0);
      }

      const prev = numCombatantsByMonsterType.get(monsterStats.id);
      numCombatantsByMonsterType.set(monsterStats.id, prev + 1);
    });

    const newMonsterCombatants: string[] = [];

    // Rename any other previous combatants
    addedCombatants.forEach((combatant) => {
      const copyCombatant = combatant;
      const { id, monsterStats, isPlayer } = copyCombatant;

      if (!isPlayer) {
        newMonsterCombatants.push(id);

        if (!numCombatantsByMonsterType.has(monsterStats.id)) {
          numCombatantsByMonsterType.set(monsterStats.id, 0);
        }

        const numPrev = numCombatantsByMonsterType.get(monsterStats.id);

        copyCombatant.name = getCombatantName(monsterStats.name, numPrev);

        numCombatantsByMonsterType.set(monsterStats.id, numPrev + 1);
      }

      updatedCombatants.set(id, copyCombatant);
    });

    setCombatants(updatedCombatants);
    setMonsterCombatants((prev) => [...prev, ...newMonsterCombatants]);
  };

  const toggleAliveState = (id: string, newState: boolean) => {
    const prevCombatants = new Map(combatants);
    prevCombatants.get(id).isDead = newState;
    setCombatants(prevCombatants);
  };

  return (
    <Layout title="Initiative" disablePadding>
      <PageContainer>
        <InitiativeList
          combatants={combatants}
          onCombatantAliveToggle={toggleAliveState}
        />
        <MonsterContainer className="scroll-enabled">
          {monsterCombatants.join(', ')}
          <AddCombatant onAddCombatants={addCombatants} />
        </MonsterContainer>
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
