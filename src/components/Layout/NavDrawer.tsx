import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faDragon, faGear } from '@fortawesome/free-solid-svg-icons';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type NavItem = {
  text: string;
  icon: ReactNode;
  href: string;
};

const NavItems: NavItem[] = [
  {
    text: 'Home',
    icon: <FontAwesomeIcon icon={faHouse} />,
    href: '/home',
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
  '& .MuiListItem-root': { padding: 0 },
  '& .MuiListItemButton-root': { padding: '12px 16px' },
  '& .MuiListItemIcon-root.rail-icon': {
    minWidth: 0,
    '&.is-active svg': { color: theme.palette.primary.main },
  },
}));

function NavDrawer() {
  const router = useRouter();

  return (
    <StyledDrawer variant="permanent">
      <List>
        {NavItems.map(({ text, icon, href }) => (
          <ListItem key={text}>
            <Link href={href} passHref>
              <ListItemButton aria-label={text} component="a" href={href}>
                <ListItemIcon
                  className={clsx({
                    'rail-icon': true,
                    'is-active': router.pathname.startsWith(href),
                  })}
                >
                  {icon}
                </ListItemIcon>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <Link href="/settings" passHref>
            <ListItemButton
              aria-label="Settings"
              component="a"
              href="/settings"
            >
              <ListItemIcon
                className={clsx({
                  'rail-icon': true,
                  'is-active': router.pathname.startsWith('/settings'),
                })}
              >
                <FontAwesomeIcon icon={faGear} />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

export default NavDrawer;
