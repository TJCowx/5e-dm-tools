import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import Ability from 'models/creature/Ability';
import { FC, useState } from 'react';

import AbilityModal from './AbilityModal';

type Props = {
  ability: Ability;
  onSave: (Ability: Ability) => void;
};

const EditAbilityButton: FC<Props> = ({ ability, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label={`Edit ${ability.name}`}
        edge="end"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      {isModalOpen && (
        <AbilityModal
          initialAbility={ability}
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditAbilityButton;
