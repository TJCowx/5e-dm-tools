import { Button } from '@mui/material';
import { styled } from '@mui/system';

interface CommonProps {
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
}

type SubmitTypeProps = CommonProps & {
  confirmType: 'submit';
  onSubmit?: never;
};

type ButtonTypeProps = CommonProps & {
  confirmType?: 'button';
  onSubmit: () => void;
};

type Props = SubmitTypeProps | ButtonTypeProps;

const Container = styled('div')(() => ({
  display: 'flex',
  columnGap: '16px',
  justifyContent: 'flex-end',
}));

export default function ModalActions({
  cancelText = 'Cancel',
  confirmText = 'Save',
  confirmType = 'button',
  onCancel,
  onSubmit,
}: Props) {
  return (
    <Container className="actions-container">
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button
        variant="contained"
        disableElevation
        type={confirmType}
        onClick={confirmType === 'button' ? onSubmit : null}
      >
        {confirmText}
      </Button>
    </Container>
  );
}
