import { ListItem } from '@mui/material';

// TODO: Fix
/* function Icon() {
  // TODO: Update router
  // const router = useRouter();

  return <div>temp</div>;
  // TODO: Fix
  /*  return (
    <ListItemIcon
      className={clsx({
        'rail-icon': true,
        'is-active': router.pathname === '/settings',
      })}
    >
      <FontAwesomeIcon icon={faGear} />
    </ListItemIcon>
   ); 
} */

export default function SettingsNavItem() {
  // const { isUpdateAvailable } = useNewestRelease();

  return (
    <ListItem className="end">
      {/* TODO: Update link */}
      {/*       <ListItemButton aria-label="Settings" component={Link} href="/settings">
        {isUpdateAvailable ? (
          <Badge variant="dot" color="secondary">
            <Icon />
          </Badge>
        ) : (
          <Icon />
        )}
      </ListItemButton> */}
    </ListItem>
  );
}
