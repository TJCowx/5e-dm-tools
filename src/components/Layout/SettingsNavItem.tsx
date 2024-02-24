import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import clsx from 'clsx';
import useNewestRelease from 'hooks/useNewestRelease';
import Link from 'next/link';
import router from 'next/router';

function Icon() {
  return (
    <ListItemIcon
      className={clsx({
        'rail-icon': true,
        'is-active': router.pathname === '/settings',
      })}>
      <FontAwesomeIcon icon={faGear} />
    </ListItemIcon>
  );
}

export default function SettingsNavItem() {
  const { isUpdateAvailable } = useNewestRelease();

  return (
    <ListItem className="end">
      <ListItemButton aria-label="Settings" component={Link} href="/settings">
        {isUpdateAvailable ? (
          <Badge variant="dot" color="secondary">
            <Icon />
          </Badge>
        ) : (
          <Icon />
        )}
      </ListItemButton>
    </ListItem>
  );
}
