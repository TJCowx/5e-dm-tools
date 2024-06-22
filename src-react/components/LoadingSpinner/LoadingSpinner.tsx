import { styled } from '@mui/material';

export default styled('span')(({ theme }) => ({
  transform: 'rotateZ(45deg)',
  perspective: '1000px',
  borderRadius: '50%',
  minWidth: '48px',
  width: '48px',
  height: '48px',
  minHeight: '48px',
  color: theme.palette.primary.main,
  position: 'relative',
  '&:before, &:after': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'inherit',
    height: 'inherit',
    borderRadius: '50%',
    transform: 'rotateX(70deg)',
    animation: '1s spin linear infinite',
  },
  '&:after': {
    color: theme.palette.secondary.main,
    transform: 'rotateY(70deg)',
    animationDelay: '.4s',
  },
  '@keyframes rotate': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotateZ(360deg)' },
  },
  '@keyframes rotateccw': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
  },
  '@keyframes spin': {
    '0%, 100%': { boxShadow: '.2em 0px 0 0px currentcolor' },
    '12%': { boxShadow: '.2em .2em 0 0 currentcolor' },
    '25%': { boxShadow: '0 .2em 0 0px currentcolor' },
    '37%': { boxShadow: '-.2em .2em 0 0 currentcolor' },
    '50%': { boxShadow: '-.2em 0 0 0 currentcolor' },
    '62%': { boxShadow: '-.2em -.2em 0 0 currentcolor' },
    '75%': { boxShadow: '0px -.2em 0 0 currentcolor' },
    '87%': { boxShadow: '.2em -.2em 0 0 currentcolor' },
  },
}));
