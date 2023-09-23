import { List, ListItemButton } from '@mui/material';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import NextLink from 'next/link';

function Home() {
  return (
    <Layout disablePadding>
      <List>
        <NextLink className="reset" href="/initiative">
          <ListItemButton>
            <ListItemText
              primary="Initiative Tracker"
              secondary="Start tracking initiative for an encounter."
            />
          </ListItemButton>
        </NextLink>
        <NextLink className="reset" href="/creatures">
          <ListItemButton>
            <ListItemText
              primary="Creatures List"
              secondary="View, create, and edit creatures."
            />
          </ListItemButton>
        </NextLink>
      </List>
    </Layout>
  );
}

export default Home;
