import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import List from '@mui/material/List';
import Layout from 'components/Layout/Layout';
import dbConnect from 'db/dbConnect';
import Monster, { MonsterModel } from 'models/monster/Monster';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const Monsters: FC = () => {
  const [monsters, setMonsters] = useState<MonsterModel[]>([]);
  const [deleteMonsterActionId, setDeleteMonsterActionId] =
    useState<string>(null);

  useEffect(() => {
    fetch('/api/monsters')
      .then(async (res) => {
        const { data } = await res.json();
        setMonsters(data.map(({ _id: mId, name }) => ({ id: mId, name })));
      })
      .catch((e) => {
        // TODO: Handle error
        console.error(e);
      });
  }, []);

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
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link href="/monsters/create" passHref>
          <IconButton aria-label="Create new monster">
            <AddIcon />
          </IconButton>
        </Link>
      </ActionContainer>
      <List dense>
        {monsters.map(({ id, name }) => (
          <Fragment key={id}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label={`Delete ${name}`}
                  color="warning"
                  onClick={() => openDialog(id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText>{name}</ListItemText>
            </ListItem>
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

export const getServerSideProps = async () => {
  await dbConnect();

  const res = await Monster.find({});

  const monsters = res.map((doc) => {
    const { _id: id, name } = doc.toObject();
    return {
      id: id.toString(),
      name,
    };
  });

  return { props: { monsters } };
};

export default Monsters;
