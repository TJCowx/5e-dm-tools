import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Ability from 'models/monster/Ability';
import { FC } from 'react';

type Props = {
  ability: Ability;
};

const Container = styled('div')(() => ({}));

const AbilityFormat: FC<Props> = ({ ability }) => {
  const { name, description } = ability;

  return (
    <Container className="ability-container">
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Container>
  );
};

export default AbilityFormat;
