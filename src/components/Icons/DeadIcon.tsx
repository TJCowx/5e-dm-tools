import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { red } from '@mui/material/colors';
import { styled } from '@mui/system';
import { FC } from 'react';

const Icon = styled(FontAwesomeIcon)(() => ({
  color: red[800],
}));

const DeadIcon: FC = () => <Icon icon={faSkullCrossbones} />;

export default DeadIcon;
