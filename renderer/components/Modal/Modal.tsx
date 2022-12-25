import { IconButton, Modal as MuiModal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FC, ReactNode } from 'react';
import IconClose from '@mui/icons-material/Close';

type Props = {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

const StyledModal = styled(MuiModal)(() => ({
  '& .modal-wrapper': {
    background: 'white', // TODO: Use theme
    width: '50vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '4px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
  '& .header-container': {
    padding: '16px 16px 0px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .content-container': { padding: '16px', overflowY: 'auto' },
}));

const Modal: FC<Props> = ({ title, isOpen, children, onClose }) => (
  <StyledModal open={isOpen} onClose={onClose}>
    <div className="modal-wrapper">
      <div className="header-container">
        <Typography variant="h5">{title}</Typography>
        <IconButton aria-label="Close Modal" onClick={onClose}>
          <IconClose />
        </IconButton>
      </div>
      <div className="content-container">{children}</div>
    </div>
  </StyledModal>
);

export default Modal;
