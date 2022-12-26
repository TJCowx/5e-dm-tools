import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
  ariaLabel: string;
  tooltipText: string;
};

const StyledLink = styled(Link)(() => ({
  position: 'relative',
  left: '-8px',
  marginTop: '16px',
}));

const NavBack: FC<Props> = ({ href, ariaLabel, tooltipText }) => (
  <StyledLink href={href}>
    <Tooltip title={tooltipText}>
      <IconButton aria-label={ariaLabel}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  </StyledLink>
);

export default NavBack;
