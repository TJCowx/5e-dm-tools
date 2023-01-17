import { Link } from '@mui/material';
import Layout from 'components/Layout/Layout';
import NextLink from 'next/link';
import { FC } from 'react';

const Custom404: FC = () => {
  return (
    <Layout title="Not found">
      Page not found,
      <br />
      <NextLink href="/home" passHref>
        <Link>Return to home.</Link>
      </NextLink>
    </Layout>
  );
};

export default Custom404;
