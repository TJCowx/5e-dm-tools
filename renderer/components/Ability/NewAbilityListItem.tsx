import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Ability from 'models/creature/Ability';
import { FC, useState } from 'react';
import AbilityModal from './AbilityModal';

type Props = {
  onSave: (ability: Ability) => void;
};

const NewAbilityListItem: FC<Props> = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPlus} />
          </ListItemIcon>
          <ListItemText primary="Add ability" className="mb-0" />
        </ListItemButton>
      </ListItem>
      {isModalOpen && (
        <AbilityModal onSave={onSave} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default NewAbilityListItem;
