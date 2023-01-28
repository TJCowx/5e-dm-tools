import { List, ListItemButton } from '@mui/material';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import NextLink from 'next/link';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Layout title="Home">
      <List>
        <NextLink href="/initiative" passHref>
          <ListItemButton component="a">
            <ListItemText
              primary="Initiative Tracker"
              secondary="Start tracking initiative for an encounter."
            />
          </ListItemButton>
        </NextLink>
        <NextLink href="/creatures" passHref>
          <ListItemButton component="a">
            <ListItemText
              primary="Creatures List"
              secondary="View, create, and edit creatures."
            />
          </ListItemButton>
        </NextLink>
        <NextLink href="/connect" passHref>
          <ListItemButton component="a">
            <ListItemText
              primary="Change Connection"
              secondary="Go back and change your connection string."
            />
          </ListItemButton>
        </NextLink>
      </List>
    </Layout>
  );
};

export default Home;
