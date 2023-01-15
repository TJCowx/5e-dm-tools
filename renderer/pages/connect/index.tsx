import { Button, Paper, styled } from '@mui/material';
import RHFTextField from 'components/Fields/RHF/RHFTextField';
import TitleBar from 'components/Layout/TitleBar';
import { init } from 'db/dbConnect';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/logUtils';

const Root = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ContentContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100vh - 28px)',
  display: 'flex',
  alignItems: ' center',
  justifyContent: 'center',
}));

const StyledPaper = styled(Paper)(() => ({
  width: '400px',
  height: '200px',
  padding: '24px',
}));

const StyledForm = styled('form')(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& .btn.connect': { alignSelf: 'flex-end' },
}));

type FormState = {
  connectionString: string;
};

const ConnectPage: FC = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: { connectionString: '' },
  });

  const onSubmit = (data: FormState) => {
    // Test Connection string
    fetch('/api/connection/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        router.push('/home');
      })
      .catch((e) => {
        console.error(e);
        logMessage('error', e);
      });
  };

  return (
    <Root>
      <TitleBar title="Connect" />
      <ContentContainer>
        <StyledPaper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              fieldName="connectionString"
              label="Connection"
              control={control}
              isRequired
            />
            <Button className="btn connect" type="submit" variant="contained">
              Connect
            </Button>
          </StyledForm>
        </StyledPaper>
      </ContentContainer>
    </Root>
  );
};

export default ConnectPage;
