import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import useSetPagePadding from '@hooks/useSetPagePadding';

function Home() {
  useSetPagePadding(false);

  return (
    <List>
      <Link className="reset" to="/initiative">
        <ListItemButton>
          <ListItemText
            primary="Initiative Tracker"
            secondary="Start tracking initiative for an encounter."
          />
        </ListItemButton>
      </Link>
      <Link className="reset" to="/creatures">
        <ListItemButton>
          <ListItemText
            primary="Creatures"
            secondary="View, create, and edit creatures."
          />
        </ListItemButton>
      </Link>
      <Link className="reset" to="/spells">
        <ListItemButton>
          <ListItemText
            primary="Spells"
            secondary="View, create, and edit spells."
          />
        </ListItemButton>
      </Link>
      <Link className="reset" to="/sources">
        <ListItemButton>
          <ListItemText
            primary="Sources"
            secondary="View, create, and edit sources."
          />
        </ListItemButton>
      </Link>
    </List>
  );
}

export default Home;
