import { Button, Paper, styled } from '@mui/material';
import RHFCheckboxField from 'components/Fields/RHF/RHFCheckboxField';
import RHFTextField from 'components/Fields/RHF/RHFTextField';
import ElectronStore from 'electron-store';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  remember: boolean;
};

const Store = new ElectronStore({ schema: { connection: { type: 'string' } } });

const ConnectPage: FC = () => {
  useDocumentTitle('Connect to Database');

  const navigate = useNavigate();

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
        navigate('/home');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <Root>
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
