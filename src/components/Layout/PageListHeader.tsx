import DebouncedInput from '@components/DebouncedInput';
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip, styled } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  columnGap: '16px',
  '& .new-btn': {
    marginLeft: 'auto',
  },
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

interface Props {
  showSourcesButton?: boolean;
  newButtonLabel: string;
  newButtonTo: string;
  onSearch: (searchVal: string) => void;
}

export default function PageListHeader({
  showSourcesButton = false,
  newButtonLabel,
  newButtonTo,
  onSearch,
}: Props) {
  const [filterText, setFilterText] = useState('');

  const handleChange = (newVal: string) => {
    onSearch(newVal);
    setFilterText(newVal);
  };

  return (
    <ActionContainer>
      <DebouncedInput
        value={filterText}
        label="Search"
        onChange={handleChange}
      />
      {showSourcesButton && (
        <Tooltip title="Sources">
          <Link to="/sources">
            <IconButton aria-label="Sources" color="primary">
              <FontAwesomeIcon icon={faBook} />
            </IconButton>
          </Link>
        </Tooltip>
      )}
      <IconButton
        className="new-btn"
        aria-label={newButtonLabel}
        component={Link}
        to={newButtonTo}
      >
        <FontAwesomeIcon icon={faPlus} />{' '}
      </IconButton>
    </ActionContainer>
  );
}
