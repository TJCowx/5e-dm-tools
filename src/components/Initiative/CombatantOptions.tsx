import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';

type Props = {
  isDead: boolean;
  onFlag: (isDead: boolean) => void;
};

function CombatantOptions({ isDead, onFlag }: Props) {
  const id = useMemo(() => v4(), []);

  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton
        ref={buttonRef}
        id={`${id}-button`}
        aria-label="Show context menu"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        aria-controls={isOpen ? `${id}-menu` : undefined}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </IconButton>
      <Menu
        anchorEl={buttonRef.current}
        id={`${id}-menu`}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {isDead ? (
          <MenuItem
            onClick={() => {
              onFlag(false);
              setIsOpen(false);
            }}
          >
            Set alive
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              onFlag(true);
              setIsOpen(false);
            }}
          >
            Set dead
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default CombatantOptions;
