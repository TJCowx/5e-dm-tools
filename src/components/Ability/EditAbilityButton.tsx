import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import Ability from '@models/creature/Ability';

import AbilityModal from './AbilityModal';

type Props = {
  ability: Partial<Ability>;
  onSave: (Ability: Partial<Ability>) => void;
};

function EditAbilityButton({ ability, onSave }: Props) {
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
      <AbilityModal
        isOpen={isModalOpen}
        initialAbility={ability}
        onSave={onSave}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default EditAbilityButton;
