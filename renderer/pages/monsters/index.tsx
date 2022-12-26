import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
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
  TextField,
} from '@mui/material';
import List from '@mui/material/List';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import { MonsterModel } from 'models/monster/Monster';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';

const ListItemTwoSecondaryActions = styled(ListItem)(() => ({
  paddingRight: 96,
}));

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
        setMonsters(
          data.map(({ _id: mId, ...monsterProps }) => ({
            id: mId,
            ...monsterProps,
          }))
        );
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
        {monsters.map(({ id, name, type, size, challengeRating }) => (
          <Fragment key={id}>
            <ListItemTwoSecondaryActions
              secondaryAction={
                <>
                  <Link href={`/monsters/edit/${id}`} passHref>
                    <IconButton aria-label={`Edit ${name}`}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    edge="end"
                    aria-label={`Delete ${name}`}
                    color="warning"
                    onClick={() => openDialog(id)}
                  >
                    <DeleteIcon />
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
