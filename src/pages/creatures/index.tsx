import {
  faBook,
  faFileDownload,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Skeleton,
  Tooltip,
  styled,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  deleteCreature,
  exportCreature,
  getAllCreatures,
} from '@api/creatures';
import DebouncedInput from '@components/DebouncedInput';
import { ListItemTwoSecondaryActions } from '@components/List';
import useSetPagePadding from '@hooks/useSetPagePadding';
import Creature from '@models/creature/Creature';
import { getCRFormatted } from '@utils/creatureUtils';
import { downloadToJson } from '@utils/exportUtils';
import { logMessage } from '@utils/loggingUtils';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  columnGap: '16px',
  '& .new-creature-btn': {
    marginLeft: 'auto',
  },
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const StyledAlert = styled(Alert)(() => ({
  marginBottom: '16px',
}));

function Creatures() {
  useSetPagePadding(true);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [filteredCreatures, setFilteredCreatures] = useState<Creature[]>([]);
  const [filterText, setFilterText] = useState('');
  const [deleteCreatureActionId, setDeleteCreatureActionId] = useState<
    string | null
  >(null);

  const loadCreatures = () => {
    setHasError(false);
    setIsLoading(true);

    getAllCreatures()
      .then((res) => {
        setCreatures(res);
        setFilteredCreatures(res);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  };

  const openDialog = (id: string) => {
    setDeleteCreatureActionId(id);
  };

  const handleDelete = (id: string) => {
    deleteCreature(id)
      .then(() => {
        setDeleteCreatureActionId(null);
        loadCreatures();
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
      });
  };

  const handleCreatureExport = (id: string) => {
    exportCreature(id)
      .then((res) => {
        downloadToJson(res, res.name);
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  useEffect(() => {
    loadCreatures();
  }, []);

  useEffect(() => {
    setFilteredCreatures(
      creatures.filter(
        ({ name, challengeRating, size, creatureType: type }) =>
          name.toLowerCase().includes(filterText.toLowerCase()) ||
          `${challengeRating}`
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          size?.name.toLowerCase().includes(filterText.toLowerCase()) ||
          type?.name.toLowerCase().includes(filterText.toLowerCase()),
      ),
    );
  }, [filterText, creatures]);

  return (
    <>
      {hasError && (
        <StyledAlert severity="error" className="mb-16">
          There was an error loading the creatures. Please{' '}
          <MuiLink component="button" onClick={loadCreatures}>
            try again.
          </MuiLink>
        </StyledAlert>
      )}
      <ActionContainer>
        <DebouncedInput
          value={filterText}
          label="Search"
          onChange={(val) => setFilterText(val)}
        />
        <Tooltip title="Sources">
          <Link to="/sources">
            <IconButton aria-label="Sources" color="primary">
              <FontAwesomeIcon icon={faBook} />
            </IconButton>
          </Link>
        </Tooltip>
        <IconButton
          className="new-creature-btn"
          aria-label="Create new creature"
          component={Link}
          to="create"
        >
          <FontAwesomeIcon icon={faPlus} />{' '}
        </IconButton>
      </ActionContainer>
      <Divider className="mt-16" />
      {isLoading ? (
        <List dense>
          {[...Array(10)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`skel-${i}`}>
              <ListItem>
                <Skeleton sx={{ width: '100%' }} />
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      ) : (
        <List dense>
          {filteredCreatures.map(
            ({ id, name, creatureType: type, size, challengeRating }) => (
              <Fragment key={id}>
                <ListItemTwoSecondaryActions
                  secondaryAction={
                    <>
                      <Tooltip title={`Export ${name}`}>
                        <IconButton
                          aria-label={`Export ${name}`}
                          onClick={() => handleCreatureExport(id)}
                        >
                          <FontAwesomeIcon icon={faFileDownload} />
                        </IconButton>
                      </Tooltip>
                      <Link to={`edit/${id}`}>
                        <IconButton aria-label={`Edit ${name}`}>
                          <FontAwesomeIcon size="xs" icon={faPen} />
                        </IconButton>
                      </Link>
                      <IconButton
                        edge="end"
                        aria-label={`Delete ${name}`}
                        color="warning"
                        onClick={() => openDialog(id)}
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
                        CR: {getCRFormatted(challengeRating)} |{' '}
                        <i>
                          {size?.name} {type.name}
                        </i>
                      </>
                    }
                  />
                </ListItemTwoSecondaryActions>
                <Divider component="li" />
              </Fragment>
            ),
          )}
        </List>
      )}
      {deleteCreatureActionId != null && (
        <Dialog open onClose={() => setDeleteCreatureActionId(null)}>
          <DialogTitle>Confirm Delete Creature</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will <strong>permanently</strong> delete the creature. Do you
              want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteCreatureActionId(null)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="warning"
              disableElevation
              onClick={() => handleDelete(deleteCreatureActionId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Creatures;
