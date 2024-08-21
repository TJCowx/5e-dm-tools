import { Alert, Divider, Link as MuiLink, styled } from '@mui/material';
import { useState } from 'react';

import useSetPagePadding from '@hooks/useSetPagePadding';
import PageListHeader from '@components/Layout/PageListHeader';

const StyledAlert = styled(Alert)(() => ({
  marginBottom: '16px',
}));

function SpellsPage() {
  useSetPagePadding(true);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const loadSpells = () => {
    console.log('TODO: Actually query spells');
  };

  const filterSpells = (filterText: string) => {
    console.log('Filtered');
  };

  return (
    <>
      {hasError && (
        <StyledAlert severity="error" className="mb-16">
          There was an error loading the spells. Please{' '}
          <MuiLink component="button" onClick={loadSpells}>
            try again.
          </MuiLink>
        </StyledAlert>
      )}
      <PageListHeader
        showSourcesButton
        newButtonTo="create"
        newButtonLabel="Create new spell"
        onSearch={filterSpells}
      />
      <Divider className="mt-16" />
    </>
  );
}

export default SpellsPage;
