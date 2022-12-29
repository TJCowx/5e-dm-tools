import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import Link from 'next/link';
import { FC } from 'react';
import { MdArrowBack } from 'react-icons/md';

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

const NavBack: FC<Props> = ({ href, ariaLabel, tooltipText }) => (
  <Link href={href}>
    <Tooltip title={tooltipText}>
      <StyledButton aria-label={ariaLabel}>
        <MdArrowBack />
      </StyledButton>
    </Tooltip>
  </Link>
);

export default NavBack;
