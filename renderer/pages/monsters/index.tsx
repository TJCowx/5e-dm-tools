import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemText,
  OutlinedInput,
  TextField,
} from '@mui/material';
import List from '@mui/material/List';
import Layout from 'components/Layout/Layout';
import dbConnect from 'db/dbConnect';
import Monster, { IMonster } from 'models/Monster';
import { FC, Fragment, useEffect, useState } from 'react';

const ActionContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiButtonBase-root': {
    alignSelf: 'center',
  },
}));

const Monsters: FC = () => {
  const [monsters, setMonsters] = useState<IMonster[]>([]);

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
        <IconButton>
          <AddIcon />
        </IconButton>
      </ActionContainer>
      <List dense>
        {monsters.map(({ id, name }) => (
          <Fragment key={id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label={`Delete ${name}`}>
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
