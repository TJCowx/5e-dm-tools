import { Typography } from '@mui/material';
import clsx from 'clsx';
import Action from 'models/creature/Action';

import ActionItem from './ActionItem';

type Props = {
  label: string;
  actions: Action[];
  className?: string;
};

function ActionList({ label, actions, className }: Props) {
  return (
    <div className={clsx({ [`${className}`]: className?.length })}>
      <Typography variant="h6" className="mb-16">
        {label}
      </Typography>
      {actions.map((action) => (
        <ActionItem key={`action-${action.name}`} action={action} />
      ))}
    </div>
  );
}

ActionList.defaultProps = {
  className: undefined,
};

export default ActionList;
