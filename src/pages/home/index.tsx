import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
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
            primary="Creatures List"
            secondary="View, create, and edit creatures."
          />
        </ListItemButton>
      </Link>
    </List>
  );
}

export default Home;
