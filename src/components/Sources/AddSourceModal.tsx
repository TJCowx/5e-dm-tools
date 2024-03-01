import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';

import { RHFTextField } from '@components/Fields/RHF';
import { Modal, ModalActions } from '@components/Modal';
import Source from '@models/Source';

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DefaultValues: Source = {
  abbreviation: '',
  name: '',
};

export default function AddSourceModal({ isOpen, onClose }: Props) {
  const { control, handleSubmit, reset } = useForm<Source>({
    defaultValues: DefaultValues,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: Source) => {
    // TODO: Call
    console.log(data);
  };

  return (
    <Modal title="Add Source" isOpen={isOpen} onClose={handleClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          fieldName="abbreviation"
          label="Abbreviation"
          control={control}
          isRequired
        />
        <RHFTextField
          fieldName="name"
          label="Name"
          control={control}
          isRequired
        />
        <ModalActions onCancel={handleClose} confirmType="submit" />
      </StyledForm>
    </Modal>
  );
}
