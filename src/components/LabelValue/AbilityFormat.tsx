import { Typography } from '@mui/material';
import Ability from 'models/creature/Ability';

type Props = {
  ability: Partial<Ability>;
};

function AbilityFormat({ ability }: Props) {
  const { name, description } = ability;

  return (
    <div className="ability-container">
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </div>
  );
}

export default AbilityFormat;
