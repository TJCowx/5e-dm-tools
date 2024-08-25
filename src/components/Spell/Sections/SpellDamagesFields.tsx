import { Divider, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormTypeSupport } from '../SpellForm';

type Props = {
  control: Control<FormTypeSupport>;
};

export default function SpellDamagesFields({ control }: Props) {
  return (
    <section>
      <Typography variant="h6">Damages</Typography>
      <Divider />
    </section>
  );
}
