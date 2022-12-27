import AddIcon from '@mui/icons-material/Add';
import { Fab, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import Modal from 'components/Modal/Modal';
import Combatant from 'models/initiative/Combatant';
import { FC, useState } from 'react';
import AddMonsterCombatantForm from './AddMonsterCombatantForm';
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

const AddCombatant: FC<Props> = ({ onAddCombatants }) => {
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
        <AddIcon />
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
              id="monster-tab"
              aria-controls="monster-panel"
              label="Monster"
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
            id="monster-panel"
            role="tabpanel"
            hidden={activeTab !== 1}
            aria-labelledby="monster-tab"
          >
            <AddMonsterCombatantForm
              onSubmit={onAddCombatants}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
export default AddCombatant;
