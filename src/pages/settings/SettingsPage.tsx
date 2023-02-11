import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import Layout from 'components/Layout/Layout';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage: FC = () => {
  useDocumentTitle('Settings');

  const version = 'fake';

  return (
    <div>
      <div>
        <Typography component="span" variant="subtitle2">
          Version:
        </Typography>
        &nbsp;
        <Typography component="span" variant="body2">
          {version}
        </Typography>
      </div>
      <Button
        variant="text"
        component={Link}
        to="https://github.com/TJCowx/5e-dm-tools"
        target="_blank"
        endIcon={<FontAwesomeIcon icon={faGithub} />}
      >
        View on GitHub
      </Button>
    </div>
  );
};

export default SettingsPage;
