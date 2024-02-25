import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import Action from 'models/creature/Action';

import ActionModal from './ActionModal';

type Props = {
  action?: Partial<Action>;
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Partial<Action>) => void;
};

function EditActionButton({ action, isLegendary, hasLair, onSave }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label={`Edit ${action?.name}`}
        edge="end"
        onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      {isModalOpen && (
        <ActionModal
          initialAction={action}
          isLegendary={isLegendary}
          hasLair={hasLair}
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default EditActionButton;
