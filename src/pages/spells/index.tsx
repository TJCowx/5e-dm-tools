import {
  Alert,
  Divider,
  IconButton,
  List,
  ListItemText,
  Link as MuiLink,
  Tooltip,
  styled,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import useSetPagePadding from '@hooks/useSetPagePadding';
import PageListHeader from '@components/Layout/PageListHeader';
import { logMessage } from '@utils/loggingUtils';
import { getAllSpells } from '@api/spells';
import { ListItemTwoSecondaryActions, SkeletonList } from '@components/List';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Spell from '@models/spell/Spell';
import { formatLevelText, isConcentration } from '@utils/spellUtils';

const StyledAlert = styled(Alert)(() => ({
  marginBottom: '16px',
}));

function SpellsPage() {
  useSetPagePadding(true);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<Spell[]>([]);

  const loadSpells = () => {
    setHasError(false);
    setIsLoading(true);

    getAllSpells()
      .then((res) => {
        setSpells(res);
        setFilteredSpells(res);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  };

  const filterSpells = (filterText: string) => {
    console.log('Filtered');
  };

  useEffect(() => {
    loadSpells();
  }, []);

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
      {isLoading && <SkeletonList />}
      <List dense>
        {filteredSpells.map(
          ({
            id,
            name,
            level,
            magicSchool,
            canRitualCast,
            duration,
            durationType,
            timeScale,
          }) => (
            <Fragment key={id}>
              <ListItemTwoSecondaryActions
                secondaryAction={
                  <>
                    <Link to={`edit/${id}`}>
                      <IconButton aria-label={`Edit ${name}`}>
                        <FontAwesomeIcon size="xs" icon={faPen} />
                      </IconButton>
                    </Link>
                    <IconButton
                      edge="end"
                      aria-label={`Delete ${name}`}
                      color="warning"
                      //onClick={() => openDialog(id)}
                    >
                      <FontAwesomeIcon size="xs" icon={faTrash} />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={name}
                  secondary={
                    <>
                      {formatLevelText(level, true)} - {magicSchool.name}
                      {canRitualCast && (
                        <>
                          <br />
                          <i>Ritual</i>
                        </>
                      )}
                      {durationType.hasTimeScale && (
                        <>
                          <br />
                          <span>
                            {duration === 1
                              ? `${durationType.name} for 1 ${timeScale.name}`
                              : `${durationType.name} up to ${duration} ${timeScale.name}s`}
                          </span>
                        </>
                      )}
                    </>
                  }
                />
              </ListItemTwoSecondaryActions>
              <Divider component="li" />
            </Fragment>
          ),
        )}
      </List>
    </>
  );
}

export default SpellsPage;
