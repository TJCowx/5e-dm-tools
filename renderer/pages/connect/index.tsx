import { Button, Paper, styled } from '@mui/material';
import { logMessage } from 'utils/logUtils';
import RHFCheckboxField from 'components/Fields/RHF/RHFCheckboxField';
import RHFTextField from 'components/Fields/RHF/RHFTextField';
import TitleBar from 'components/Layout/TitleBar';
import ElectronStore from 'electron-store';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  remember: boolean;
};

const Store = new ElectronStore({ schema: { connection: { type: 'string' } } });

const ConnectPage: FC = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      connectionString: Store.get('connection') ?? '',
      remember: true,
    },
  });

  const onSubmit = (data: FormState) => {
    // Test Connection string
    fetch('/connection/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        if (data.remember) {
          Store.set('connection', data.connectionString);
        } else {
          Store.delete('connection');
        }
        router.push('/home');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <Root>
      <TitleBar title="Connect" />
      <ContentContainer>
        <StyledPaper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div className="fields-container">
              <RHFTextField
                className="w-100"
                fieldName="connectionString"
                label="Connection"
                control={control}
                isRequired
              />
              <RHFCheckboxField
                fieldName="remember"
                label="Remember Connection"
                control={control}
              />
            </div>
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
