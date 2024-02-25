import { List } from '@mui/material';

import Layout from 'components/Layout/Layout';

function Home() {
  return (
    <Layout disablePadding>
      <List>
        {/* TODO: fix */}
        {/*         <NextLink className="reset" href="/initiative">
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
        </NextLink> */}
      </List>
    </Layout>
  );
}

export default Home;
