import { List, ListItemButton } from '@mui/material';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  useDocumentTitle('Home');

  return (
    <List>
      <ListItemButton component={Link} to="/initiative">
        <ListItemText
          primary="Initiative Tracker"
          secondary="Start tracking initiative for an encounter."
        />
      </ListItemButton>
      <ListItemButton component={Link} to="/creatures">
        <ListItemText
          primary="Creatures List"
          secondary="View, create, and edit creatures."
        />
      </ListItemButton>
      <ListItemButton component={Link} to="/connect">
        <ListItemText
          primary="Change Connection"
          secondary="Go back and change your connection string."
        />
      </ListItemButton>
    </List>
  );
};

export default HomePage;
