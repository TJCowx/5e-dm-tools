import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Action from 'models/monster/Action';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  onSave: (action: Action) => void;
};

const ActionModal: FC<Props> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListItem>
      <ListItemButton onClick={() => setIsOpen(false)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Add action</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default ActionModal;
