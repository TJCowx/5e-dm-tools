import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { addNewSource, updateSource } from '@api/sources';
import { RHFTextField } from '@components/Fields/RHF';
import { Modal, ModalActions } from '@components/Modal';
import Source from '@models/source/Source';
import { logMessage } from '@utils/loggingUtils';

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',
}));

interface Props {
  isOpen: boolean;
  initialValue?: Source;
  mode: 'create' | 'edit';
  onSuccess: () => void;
  onClose: () => void;
}

const DefaultValues: Source = {
  abbreviation: '',
  name: '',
};

export default function AddSourceModal({
  isOpen,
  initialValue = DefaultValues,
  mode,
  onSuccess,
  onClose,
}: Props) {
  const saveFn = useMemo(
    () => (mode === 'create' ? addNewSource : updateSource),
    [mode],
  );

  const [error, setError] = useState<string>();

  const { control, handleSubmit, reset, watch } = useForm<Source>({
    defaultValues: initialValue,
  });

  const abbr = watch('abbreviation');

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: Source) => {
    saveFn(data)
      .then(() => {
        reset();
        onSuccess();
      })
      .catch((e) => {
        logMessage('error', e);
        setError(e);
      });
  };

  useEffect(() => {
    if (error) setError(undefined);
  }, [abbr]);

  useEffect(() => {
    if (isOpen && initialValue) {
      reset(initialValue);
    }
  }, [initialValue, isOpen]);

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
