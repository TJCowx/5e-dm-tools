import { styled } from '@mui/system';
import { ReactNode, Suspense } from 'react';

import { LoadingSpinner } from '@components/LoadingSpinner';

const Container = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface Props {
  element: ReactNode;
}

export default function SuspenseElement({ element }: Props) {
  return (
    <Suspense
      fallback={
        <Container>
          <LoadingSpinner />
        </Container>
      }
    >
      {element}
    </Suspense>
  );
}
