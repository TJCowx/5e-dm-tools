import { IconButton, Modal as MuiModal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FC, ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  contentContainerStyle?: object;
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
  '& .scroll-enabled': {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '16px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: '12px',
      border: '4px solid transparent',
      backgroundClip: 'content-box',
      minWidth: '16px',
      minHeigh: '16px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
}));

const Modal: FC<Props> = ({
  title,
  isOpen,
  children,
  contentContainerStyle,
  onClose,
}) => (
  <StyledModal open={isOpen} onClose={onClose}>
    <div className="modal-wrapper">
      <div className="header-container">
        <Typography variant="h5">{title}</Typography>
        <IconButton aria-label="Close Modal" onClick={onClose}>
          <MdClose />
        </IconButton>
      </div>
      <div
        className="content-container scroll-enabled"
        style={contentContainerStyle}
      >
        {children}
      </div>
    </div>
  </StyledModal>
);

Modal.defaultProps = {
  contentContainerStyle: undefined,
};

export default Modal;
