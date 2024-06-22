import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import useNewestRelease from '@hooks/useNewestRelease';

function Icon() {
  const { pathname } = useLocation();

  return (
    <ListItemIcon
      className={clsx({
        'rail-icon': true,
        'is-active': pathname === '/settings',
      })}>
      <FontAwesomeIcon icon={faGear} />
    </ListItemIcon>
  );
}

export default function SettingsNavItem() {
  const { isUpdateAvailable } = useNewestRelease();

  return (
    <ListItem className="end">
      <ListItemButton aria-label="Settings" component={Link} to="/settings">
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
