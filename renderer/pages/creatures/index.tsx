import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  Link as MuiLink,
  ListItem,
  Skeleton,
  styled,
} from '@mui/material';
import List from '@mui/material/List';
import Creature from 'models/creature/Creature';
import { logMessage } from 'utils/logUtils';
import DebouncedInput from 'components/DebouncedInput/DebouncedInput';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const Creatures: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [filteredCreatures, setFilteredCreatures] = useState<Creature[]>([]);
  const [filterText, setFilterText] = useState('');
  const [deleteCreatureActionId, setDeleteCreatureActionId] =
    useState<string>(null);

  const loadCreatures = () => {
    setHasError(false);
    setIsLoading(true);
    fetch('/creatures')
      .then(async (res) => {
        const { data } = await res.json();

        setCreatures(data);
        setFilteredCreatures(data);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadCreatures();
  }, []);

  useEffect(() => {
    setFilteredCreatures(
      creatures.filter(
        ({ name, challengeRating, size, type }) =>
          name.toLowerCase().includes(filterText.toLowerCase()) ||
          `${challengeRating}`
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          size.toLowerCase().includes(filterText.toLowerCase()) ||
          type.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, creatures]);

  const openDialog = (id: string) => {
    setDeleteCreatureActionId(id);
  };

  const handleDelete = (id: string) => {
    fetch(`/creatures/${id}`, { method: 'DELETE' })
      .then(() => {
        setCreatures((prev) => prev.filter(({ id: mId }) => mId !== id));
        setDeleteCreatureActionId(null);
      })
      .catch((e) => {
        logMessage('error', e);
        setDeleteCreatureActionId(null);
      });
  };

  return (
    <Layout title="Creatures">
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error loading the creatures. Please{' '}
          <MuiLink component="button" onClick={loadCreatures}>
            try again.
          </MuiLink>
        </Alert>
      )}
      <ActionContainer>
        <DebouncedInput
          value={filterText}
          label="Search"
          onChange={(val) => setFilterText(val)}
        />
        <Link href="/creatures/create" passHref>
          <IconButton aria-label="Create new creature">
            <FontAwesomeIcon icon={faPlus} />{' '}
          </IconButton>
        </Link>
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
            ({ id, name, type, size, challengeRating }) => (
              <Fragment key={id}>
                <ListItemTwoSecondaryActions
                  secondaryAction={
                    <>
                      <Link href={`/creatures/edit/${id}`} passHref>
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
                        CR: {challengeRating} |{' '}
                        <i>
                          {size} {type}
                        </i>
                      </>
                    }
                  />
                </ListItemTwoSecondaryActions>
                <Divider component="li" />
              </Fragment>
            )
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
    </Layout>
  );
};

export default Creatures;
