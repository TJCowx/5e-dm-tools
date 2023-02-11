import { Link as MuiLink } from '@mui/material';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  useDocumentTitle('Not found');

  return (
    <div>
      Page not found,
      <br />
      <MuiLink component={Link} to="/">
        Return to home.
      </MuiLink>
    </div>
  );
};

export default NotFoundPage;
