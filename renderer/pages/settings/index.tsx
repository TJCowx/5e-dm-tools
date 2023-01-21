import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, Link, styled, Typography } from '@mui/material';
import Layout from 'components/Layout/Layout';
import getConfig from 'next/config';
import NextLink from 'next/link';
import { FC } from 'react';

const SettingsPage: FC = () => {
  const { publicRuntimeConfig } = getConfig();

  return (
    <Layout title="Settings">
      <div>
        <Typography component="span" variant="subtitle2">
          Version:
        </Typography>
        &nbsp;
        <Typography component="span" variant="body2">
          {publicRuntimeConfig.version}
        </Typography>
      </div>
      <NextLink href="https://github.com/TJCowx/5e-dm-tools" passHref>
        <Button
          variant="text"
          component="a"
          target="_blank"
          endIcon={<FontAwesomeIcon icon={faGithub} />}
        >
          View on GitHub
        </Button>
      </NextLink>
    </Layout>
  );
};

export default SettingsPage;
