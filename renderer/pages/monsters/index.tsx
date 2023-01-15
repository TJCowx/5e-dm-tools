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
import DebouncedInput from 'components/DebouncedInput/DebouncedInput';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import { MonsterModel } from 'models/monster/Monster';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';
import { logMessage } from 'utils/logUtils';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const Monsters: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [monsters, setMonsters] = useState<MonsterModel[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<MonsterModel[]>([]);
  const [filterText, setFilterText] = useState('');
  const [deleteMonsterActionId, setDeleteMonsterActionId] =
    useState<string>(null);

  const loadMonsters = () => {
    setHasError(false);
    setIsLoading(true);
    fetch('/api/monsters')
      .then(async (res) => {
        const { data } = await res.json();

        setMonsters(data);
        setFilteredMonsters(data);
        setIsLoading(false);
      })
      .catch((e) => {
        logMessage('error', e);
        setHasError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMonsters();
  }, []);

  useEffect(() => {
    setFilteredMonsters(
      monsters.filter(
        ({ name, challengeRating, size, type }) =>
          name.toLowerCase().includes(filterText.toLowerCase()) ||
          `${challengeRating}`
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          size.toLowerCase().includes(filterText.toLowerCase()) ||
          type.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, monsters]);

  const openDialog = (id: string) => {
    setDeleteMonsterActionId(id);
  };

  const handleDelete = (id: string) => {
    fetch(`/api/monsters/${id}`, { method: 'DELETE' })
      .then(() => {
        setMonsters((prev) => prev.filter(({ id: mId }) => mId !== id));
        setDeleteMonsterActionId(null);
      })
      .catch((e) => {
        logMessage('error', e);
        setDeleteMonsterActionId(null);
      });
  };

  return (
    <Layout title="Monsters">
      {hasError && (
        <Alert severity="error" className="mb-16">
          There was an error loading the monsters. Please{' '}
          <MuiLink component="button" onClick={loadMonsters}>
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
        <Link href="/monsters/create" passHref>
          <IconButton aria-label="Create new monster">
            <FontAwesomeIcon icon={faPlus} />{' '}
          </IconButton>
        </Link>
      </ActionContainer>
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
          {filteredMonsters.map(({ id, name, type, size, challengeRating }) => (
            <Fragment key={id}>
              <ListItemTwoSecondaryActions
                secondaryAction={
                  <>
                    <Link href={`/monsters/edit/${id}`} passHref>
                      <IconButton aria-label={`Edit ${name}`}>
                        <FontAwesomeIcon icon={faPen} />
                      </IconButton>
                    </Link>
                    <IconButton
                      edge="end"
                      aria-label={`Delete ${name}`}
                      color="warning"
                      onClick={() => openDialog(id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
          ))}
        </List>
      )}
      {deleteMonsterActionId != null && (
        <Dialog open onClose={() => setDeleteMonsterActionId(null)}>
          <DialogTitle>Confirm Delete Monster</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will <strong>permanently</strong> delete the monster. Do you
              want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteMonsterActionId(null)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="warning"
              disableElevation
              onClick={() => handleDelete(deleteMonsterActionId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Layout>
  );
};

export default Monsters;
