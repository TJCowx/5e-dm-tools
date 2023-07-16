import { Button, Paper, styled } from '@mui/material';
import { invoke } from '@tauri-apps/api/tauri';
import RHFTextField from 'components/Fields/RHF/RHFTextField';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { logMessage } from 'utils/loggingUtils';

const Root = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
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
  '& button.connect': { alignSelf: 'flex-end' },
}));

type FormState = {
  connectionString: string;
};

const Connect = () => {
  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      connectionString: '',
    },
  });

  const onSubmit = (data: FormState) => {
    invoke('connect_db', { conn_str: data.connectionString })
      .then(() => router.push('/home'))
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <Root style={{ paddingTop: '16px' }}>
      <StyledPaper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            fieldName="connectionString"
            label="Connection"
            control={control}
            isRequired
          />
          <Button className="connect" type="submit" variant="contained">
            Connect
          </Button>
        </StyledForm>
      </StyledPaper>
    </Root>
  );
};

export default Connect;
