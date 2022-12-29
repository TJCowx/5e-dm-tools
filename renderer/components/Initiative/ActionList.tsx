import { Typography } from '@mui/material';
import clsx from 'clsx';
import Action from 'models/monster/Action';
import { FC } from 'react';

import ActionItem from './ActionItem';

type Props = {
  label: string;
  actions: Action[];
  className?: string;
};

const ActionList: FC<Props> = ({ label, actions, className }) => (
  <div className={clsx({ [`${className}`]: className?.length })}>
    <Typography variant="h6" className="mb-16">
      {label}
    </Typography>
    {actions.map((action) => (
      <ActionItem key={`action-${action.name}`} action={action} />
    ))}
  </div>
);

ActionList.defaultProps = {
  className: undefined,
};

export default ActionList;
