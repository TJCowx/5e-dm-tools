import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

import Action from '@models/creature/Action';

import ActionModal from './ActionModal';

type Props = {
  isLegendary?: boolean;
  hasLair?: boolean;
  onSave: (action: Partial<Action>) => void;
};

function NewActionListItem({
  isLegendary = false,
  hasLair = false,
  onSave,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPlus} />
          </ListItemIcon>
          <ListItemText primary="Add action" className="mb-0" />
        </ListItemButton>
      </ListItem>
      {isModalOpen && (
        <ActionModal
          isLegendary={isLegendary}
          hasLair={hasLair}
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default NewActionListItem;
