import { FormControlLabel, Switch } from '@mui/material';
import clsx from 'clsx';

type Props = {
  value: boolean;
  label: string;
  className?: string;
  onChange: (val: boolean) => void;
};

function BasicSwitchField({ value, label, className, onChange }: Props) {
  return (
    <FormControlLabel
      label={label}
      className={clsx({ [`${className}`]: className })}
      control={
        <Switch checked={value} onChange={(e) => onChange(e.target.checked)} />
      }
    />
  );
}

export default BasicSwitchField;
