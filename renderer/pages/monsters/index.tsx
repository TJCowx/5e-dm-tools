import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  styled,
} from '@mui/material';
import List from '@mui/material/List';
import DebouncedInput from 'components/Fields/DebouncedInput';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import { MonsterModel } from 'models/monster/Monster';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit } from 'react-icons/md';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const Monsters: FC = () => {
  const [monsters, setMonsters] = useState<MonsterModel[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<MonsterModel[]>([]);
  const [deleteMonsterActionId, setDeleteMonsterActionId] =
    useState<string>(null);

  useEffect(() => {
    fetch('/api/monsters')
      .then(async (res) => {
        const { data } = await res.json();

        setMonsters(data);
        setFilteredMonsters(data);
      })
      .catch((e) => {
        // TODO: Handle error
        console.error(e);
      });
  }, []);

  const filterMonster = (filterText: string) => {
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
  };

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
        // TODO: Handle Error
        console.error(e);
        setDeleteMonsterActionId(null);
      });
  };

  return (
    <Layout title="Monsters">
      <ActionContainer>
        <DebouncedInput value="" label="Search" onChange={filterMonster} />
        <Link href="/monsters/create" passHref>
          <IconButton aria-label="Create new monster">
            <MdAdd />
          </IconButton>
        </Link>
      </ActionContainer>
      <List dense>
        {filteredMonsters.map(({ id, name, type, size, challengeRating }) => (
          <Fragment key={id}>
            <ListItemTwoSecondaryActions
              secondaryAction={
                <>
                  <Link href={`/monsters/edit/${id}`} passHref>
                    <IconButton aria-label={`Edit ${name}`}>
                      <MdEdit />
                    </IconButton>
                  </Link>
                  <IconButton
                    edge="end"
                    aria-label={`Delete ${name}`}
                    color="warning"
                    onClick={() => openDialog(id)}
                  >
                    <MdDeleteForever />
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
