import Button from '@mui/material/Button';
import Layout from 'components/Layout/Layout';
import { FC } from 'react';
import { logMessage } from 'utils/logUtils';

const Home: FC = () => {
  const testLog = () => {
    try {
      throw new Error('This is an error');
    } catch (e) {
      logMessage('error', 'This is a test message');
    }
  };

  return (
    <Layout title="Home">
      <Button onClick={testLog}>Test Log</Button>
    </Layout>
  );
};

export default Home;
