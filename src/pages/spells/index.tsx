import { Alert, Link as MuiLink, styled } from '@mui/material';
import { useState } from 'react';

import useSetPagePadding from '@hooks/useSetPagePadding';

const StyledAlert = styled(Alert)(() => ({
  marginBottom: '16px',
}));

function SpellsPage() {
  useSetPagePadding(true);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [spells, setSpells] = useState([]);

  const loadSpells = () => {
    console.log('TODO: Actually query spells');
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
      <div>Test</div>
    </>
  );
}

export default SpellsPage;
