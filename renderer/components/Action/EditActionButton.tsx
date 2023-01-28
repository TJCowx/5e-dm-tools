import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import AbilityModal from 'components/Ability/AbilityModal';
import Action from 'models/creature/Action';
import { FC, useState } from 'react';
import ActionModal from './ActionModal';

type Props = {
  action?: Action;
  isLegendary: boolean;
  hasLair: boolean;
  onSave: (action: Action) => void;
};

const EditActionButton: FC<Props> = ({
  action,
  isLegendary,
  hasLair,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label={`Edit ${action.name}`}
        edge="end"
        onClick={() => setIsModalOpen(true)}
      >
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
};

export default EditActionButton;
