import {
  faDragon,
  faHouse,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
} from '@mui/material';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SettingsNavItem from './SettingsNavItem';

type NavItem = {
  text: string;
  icon: ReactNode;
  href: string;
  activeMustMatch?: boolean;
};

const NavItems: NavItem[] = [
  {
    text: 'Home',
    icon: <FontAwesomeIcon icon={faHouse} />,
    href: '/',
    activeMustMatch: true,
  },
  {
    text: 'Initiative',
    icon: <FontAwesomeIcon icon={faListAlt} />,
    href: '/initiative',
  },
  {
    text: 'Creatures',
    icon: <FontAwesomeIcon icon={faDragon} />,
    href: '/creatures',
  },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiList-root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiListItem-root': { padding: 0 },
  '& .MuiListItemButton-root': { padding: '12px 16px' },
  '& .MuiListItemIcon-root.rail-icon': {
    minWidth: 0,
    '&.is-active svg': { color: theme.palette.primary.main },
  },
  '& .end': { marginTop: 'auto' },
}));

function NavDrawer() {
  const { pathname } = useLocation();

  return (
    <StyledDrawer variant="permanent">
      <List>
        {NavItems.map(({ text, icon, href, activeMustMatch }) => (
          <ListItem key={text}>
            <ListItemButton aria-label={text} component={Link} to={href}>
              <ListItemIcon
                className={clsx({
                  'rail-icon': true,
                  'is-active': activeMustMatch
                    ? pathname === href
                    : pathname.startsWith(href),
                })}>
                {icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        <SettingsNavItem />
      </List>
    </StyledDrawer>
  );
}

export default NavDrawer;
