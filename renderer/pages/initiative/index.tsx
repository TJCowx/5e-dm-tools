import { styled } from '@mui/system';
import AddCombatant from 'components/Initiative/AddCombatant';
import CreatureCombatantList from 'components/Initiative/CreatureCombatantList';
import InitiativeList from 'components/Initiative/InitiativeList';
import Layout from 'components/Layout/Layout';
import useConfirmBeforeExitPage from 'hooks/useConfirmBeforeExitPage';
import Combatant from 'models/initiative/Combatant';
import { FC, useState } from 'react';
import { getCombatantName } from 'utils/creatureUtils';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

const InitiativePage: FC = () => {
  useConfirmBeforeExitPage();

  const [creatureCombatants, setCreatureCombatants] = useState(
    new Map<string, Combatant>([])
  );
  const [combatants, setCombatants] = useState(new Map<string, Combatant>());

  const addCombatants = (addedCombatants: Combatant[]) => {
    const numCombatantsByType = new Map<string, number>();

    // Previous named combatants
    const updatedCombatants = new Map(combatants);
    const updatedCreatureCombatants = new Map(creatureCombatants);

    // Count number of previously named combatants
    Array.from(combatants.values()).forEach(({ isPlayer, stats }) => {
      if (isPlayer) return;

      if (!numCombatantsByType.has(stats.id)) {
        numCombatantsByType.set(stats.id, 0);
      }

      const prev = numCombatantsByType.get(stats.id);
      numCombatantsByType.set(stats.id, prev + 1);
    });

    // Rename any other previous combatants
    addedCombatants.forEach((combatant) => {
      const copyCombatant = combatant;
      const { id, stats, isPlayer } = copyCombatant;

      if (!isPlayer) {
        if (!numCombatantsByType.has(stats.id)) {
          numCombatantsByType.set(stats.id, 0);
        }

        const numPrev = numCombatantsByType.get(stats.id);

        copyCombatant.name = getCombatantName(stats.name, numPrev);

        numCombatantsByType.set(stats.id, numPrev + 1);

        updatedCreatureCombatants.set(id, copyCombatant);
      }

      updatedCombatants.set(id, copyCombatant);
    });

    setCombatants(updatedCombatants);
    setCreatureCombatants(updatedCreatureCombatants);
  };

  const toggleAliveState = (id: string, newState: boolean) => {
    const prevCombatants = new Map(combatants);
    prevCombatants.get(id).isDead = newState;
    setCombatants(prevCombatants);
  };

  const highlightCreatureCombatant = (combatant: Combatant) => {
    if (combatant.isPlayer) return;

    const creaturePanel = document.getElementById(
      `panel-${combatant.id}-header`
    );

    // Expand it if it isn't already expanded
    if (!creaturePanel.classList.contains('Mui-expanded')) {
      creaturePanel.click();
    }

    creaturePanel.scrollIntoView();
  };

  return (
    <Layout title="Initiative" disablePadding contentFillPage>
      <PageContainer>
        <InitiativeList
          combatants={combatants}
          onCombatantAliveToggle={toggleAliveState}
          onCombatantClick={highlightCreatureCombatant}
        />
        <CreatureCombatantList combatants={creatureCombatants} />
        <AddCombatant onAddCombatants={addCombatants} />
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
