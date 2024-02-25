import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

import Modal from 'components/Modal/Modal';
import Combatant from 'models/initiative/Combatant';

import AddCreatureCombatantForm from './AddCreatureCombatantForm';
import AddPlayerCombatantForm from './AddPlayerCombatantForm';

type Props = {
  onAddCombatants: (combatants: Combatant[]) => void;
};

const StyledTabs = styled(Tabs)(() => ({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

const StyledFab = styled(Fab)(() => ({
  position: 'absolute',
  bottom: 16,
  right: 16,
}));

function AddCombatant({ onAddCombatants }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <StyledFab
        color="primary"
        aria-label="Add Combatant"
        size="small"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </StyledFab>
      {isOpen && (
        <Modal
          title="Add Combatant"
          isOpen={isOpen}
          contentContainerStyle={{ paddingTop: '0px' }}
          onClose={() => setIsOpen(false)}
        >
          <StyledTabs
            value={activeTab}
            onChange={(_, newVal) => setActiveTab(newVal)}
          >
            <Tab id="player-tab" aria-controls="player-panel" label="Player" />
            <Tab
              id="creature-tab"
              aria-controls="creature-panel"
              label="Creature"
            />
          </StyledTabs>
          <div
            id="player-panel"
            role="tabpanel"
            hidden={activeTab !== 0}
            aria-labelledby="player-tab"
          >
            <AddPlayerCombatantForm
              onSubmit={(combatant) => onAddCombatants([combatant])}
              onCancel={() => setIsOpen(false)}
            />
          </div>
          <div
            id="creature-panel"
            role="tabpanel"
            hidden={activeTab !== 1}
            aria-labelledby="creature-tab"
          >
            <AddCreatureCombatantForm
              onSubmit={onAddCombatants}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
export default AddCombatant;
