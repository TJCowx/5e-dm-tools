import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import useSetPagePadding from '@hooks/useSetPagePadding';

const Links = [
  {
    to: '/initiative',
    primaryText: 'Initiative Tracker',
    secondaryText: 'Start tracking initiative for an encounter.',
  },
  {
    to: '/creatures',
    primaryText: 'Creatures',
    secondaryText: 'View, create, and edit creatures.',
  },
  {
    to: '/spells',
    primaryText: 'Spells',
    secondaryText: 'View, create, and edit spells.',
  },
  {
    to: '/sources',
    primaryText: 'Sources',
    secondaryText: 'View, create, and edit sources.',
  },
];

function Home() {
  useSetPagePadding(false);

  return (
    <List>
      {Links.map(({ to, primaryText, secondaryText }) => (
        <ListItemButton key={to} to={to} component={Link}>
          <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default Home;
