import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import Attribute from '@models/creature/Attribute';
import { getFormattedModifier } from '@utils/modifierUtils';

type Props = {
  label: Attribute;
  value: number;
};

const StatContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function FormattedStat({ label, value }: Props) {
  const modifier = getFormattedModifier(value);

  return (
    <StatContainer className="formatted-stat">
      <Typography variant="subtitle2" className="label">
        {label}
      </Typography>
      <Typography variant="body2" className="value">
        {value} ({modifier})
      </Typography>
    </StatContainer>
  );
}

export default FormattedStat;
