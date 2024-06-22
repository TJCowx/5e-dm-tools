import styled from '@emotion/styled';
import { useState } from 'react';

import {
  AddCombatant,
  CreatureCombatantList,
  InitiativeList,
} from '@components/Initiative';
import useSetPagePadding from '@hooks/useSetPagePadding';
import Combatant from '@models/initiative/Combatant';
import { getCombatantName } from '@utils/creatureUtils';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

function InitiativePage() {
  useSetPagePadding(false);
  const [creatureCombatants, setCreatureCombatants] = useState(
    new Map<string, Combatant>([]),
  );
  const [combatants, setCombatants] = useState(new Map<string, Combatant>());

  const addCombatants = (addedCombatants: Combatant[]) => {
    const numCombatantsByType = new Map<string, number>();

    // Previous named combatants
    const updatedCombatants = new Map(combatants);
    const updatedCreatureCombatants = new Map(creatureCombatants);

    // Count number of previously named combatants
    Array.from(combatants.values()).forEach(({ isPlayer, stats }) => {
      if (isPlayer || !stats) return;

      if (!numCombatantsByType.has(stats.id)) {
        numCombatantsByType.set(stats.id, 0);
      }

      const prev = numCombatantsByType.get(stats.id) ?? 0;
      numCombatantsByType.set(stats.id, prev + 1);
    });

    // Rename any other previous combatants
    addedCombatants.forEach((combatant) => {
      const copyCombatant = combatant;
      const { id, stats, isPlayer } = copyCombatant;

      if (!isPlayer && stats) {
        if (!numCombatantsByType.has(stats.id)) {
          numCombatantsByType.set(stats.id, 0);
        }

        const numPrev = numCombatantsByType.get(stats.id) ?? 0;

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
    const combatant = prevCombatants.get(id);
    if (combatant) {
      combatant.isDead = newState;
      combatant.currentHp = combatant.isDead ? 0 : 1;
      prevCombatants.set(id, combatant);
    }

    setCombatants(prevCombatants);

    if (creatureCombatants.has(id)) {
      const prevCreatureCombatants = new Map(creatureCombatants);
      const creatureCombatant = prevCreatureCombatants.get(id);
      if (creatureCombatant) {
        creatureCombatant.isDead = newState;
        creatureCombatant.currentHp = creatureCombatant.isDead ? 0 : 1;
        prevCreatureCombatants.set(id, creatureCombatant);
      }
      setCreatureCombatants(prevCreatureCombatants);
    }
  };

  const highlightCreatureCombatant = (combatant: Combatant) => {
    if (combatant.isPlayer) return;

    const creaturePanel = document.getElementById(
      `panel-${combatant.id}-header`,
    );

    if (!creaturePanel) return;

    // Expand it if it isn't already expanded
    if (!creaturePanel.classList.contains('Mui-expanded')) {
      creaturePanel.click();
    }

    creaturePanel.scrollIntoView();
  };

  return (
    <PageContainer>
      <InitiativeList
        combatants={combatants}
        onCombatantAliveToggle={toggleAliveState}
        onCombatantClick={highlightCreatureCombatant}
      />
      <CreatureCombatantList combatants={creatureCombatants} />
      <AddCombatant onAddCombatants={addCombatants} />
    </PageContainer>
  );
}

export default InitiativePage;
