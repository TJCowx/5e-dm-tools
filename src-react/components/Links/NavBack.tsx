import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

type Props = {
  href: string;
  ariaLabel: string;
  tooltipText: string;
};

const StyledButton = styled(IconButton)(() => ({
  position: 'relative',
  left: '-8px',
  marginBottom: '16px',
}));

function NavBack({ href, ariaLabel, tooltipText }: Props) {
  return (
    <Tooltip title={tooltipText}>
      <Link to={href}>
        <StyledButton aria-label={ariaLabel}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledButton>
      </Link>
    </Tooltip>
  );
}

export default NavBack;
