import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { red } from '@mui/material/colors';
import { styled } from '@mui/system';

const Icon = styled(FontAwesomeIcon)(() => ({
  color: red[800],
}));

function DeadIcon() {
  return <Icon icon={faSkullCrossbones} />;
}

export default DeadIcon;
