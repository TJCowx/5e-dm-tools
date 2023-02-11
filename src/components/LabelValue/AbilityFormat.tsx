import { Typography } from '@mui/material';
import Ability from 'models/creature/Ability';
import { FC } from 'react';

type Props = {
  ability: Ability;
};

const AbilityFormat: FC<Props> = ({ ability }) => {
  const { name, description } = ability;

  return (
    <div className="ability-container">
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </div>
  );
};

export default AbilityFormat;
