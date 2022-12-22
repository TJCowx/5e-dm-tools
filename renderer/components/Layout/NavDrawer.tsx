import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { ReactNode } from 'react';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import QueueIcon from '@mui/icons-material/Queue';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import styled from '@mui/system/styled';

interface NavItem {
  text: string;
  icon: ReactNode;
  href: string;
}

const NavItems: NavItem[] = [
  { text: 'Home', icon: <HomeIcon />, href: '/' },
  { text: 'Initiative', icon: <QueueIcon />, href: '/initiative' },
  { text: 'Monsters', icon: <PestControlRodentIcon />, href: '/monsters' },
];

const Buffer = styled('div')(() => ({
  minWidth: '56px',
}));

//   listItem: { padding: 0 },
//   listItemButton: { padding: '6px 16px' },
//   listItemIcon: { minWidth: 0 },

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiPaper-root': { top: '28px' },
  '& .MuiListItem-root': { padding: 0 },
  '& .MuiListItemButton-root': { padding: '6px 16px' },
  '& .MuiListItemIcon-root': { minWidth: 0 },
}));

const NavDrawer = () => (
  <>
    <Buffer />
    <StyledDrawer variant="permanent">
      <List>
        {NavItems.map(({ text, icon, href }) => (
          <ListItem key={text}>
            <Link href={href} passHref>
              <ListItemButton aria-label={text} component="a" href={href}>
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  </>
);

export default NavDrawer;
