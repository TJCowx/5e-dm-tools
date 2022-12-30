import { FormControlLabel, Switch } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  value: boolean;
  label: string;
  className?: string;
  onChange: (val: boolean) => void;
};

const BasicSwitchField: FC<Props> = ({ value, label, className, onChange }) => (
  <FormControlLabel
    label={label}
    className={clsx({ [`${className}`]: className })}
    control={
      <Switch checked={value} onChange={(e) => onChange(e.target.checked)} />
    }
  />
);

BasicSwitchField.defaultProps = {
  className: undefined,
};

export default BasicSwitchField;
