import { Drawer, List, styled } from '@mui/material';

import SettingsNavItem from './SettingsNavItem';

// TODO: Fix
/* type NavItem = {
  text: string;
  icon: ReactNode;
  href: string;
  activeMustMatch?: boolean;
}; */

// TODO: Fix
/* const NavItems: NavItem[] = [
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
]; */

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
  // TODO: Updated router
  // const router = useRouter();

  return (
    <StyledDrawer variant="permanent">
      <List>
        {/* TODO: Update link */}
        {/* {NavItems.map(({ text, icon, href, activeMustMatch }) => (
          <ListItem key={text}>
            <ListItemButton aria-label={text} component={Link} href={href}>
              <ListItemIcon
                className={clsx({
                  'rail-icon': true,
                  'is-active': activeMustMatch
                    ? router.pathname === href
                    : router.pathname.startsWith(href),
                })}
              >
                {icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))} */}
        <SettingsNavItem />
      </List>
    </StyledDrawer>
  );
}

export default NavDrawer;
