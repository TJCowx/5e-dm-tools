import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { addNewSource } from '@api/sources';
import { RHFTextField } from '@components/Fields/RHF';
import { Modal, ModalActions } from '@components/Modal';
import Source from '@models/Source';
import { logMessage } from '@utils/loggingUtils';

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
  const [error, setError] = useState<string>();

  const { control, handleSubmit, reset, watch } = useForm<Source>({
    defaultValues: DefaultValues,
  });

  const abbr = watch('abbreviation');

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: Source) => {
    addNewSource(data)
      .then(() => {
        reset();
        onClose();
      })
      .catch((e) => {
        logMessage('error', e);
        setError(e);
      });
  };

  useEffect(() => {
    if (error) setError(undefined);
  }, [abbr]);

  return (
    <Modal title="Add Source" isOpen={isOpen} onClose={handleClose}>
      {error && (
        <Alert severity="error" className="mb-16">
          {error}
        </Alert>
      )}
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
