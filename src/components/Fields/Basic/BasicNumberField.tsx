import { TextField } from '@mui/material';
import clsx from 'clsx';
import { FC, useMemo } from 'react';

type Props = {
  className?: string;
  value: string | number | null;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  onChange: (newVal: number | undefined) => void;
  onBlur?: () => void;
};

const BasicNumberField: FC<Props> = ({
  className,
  value,
  label,
  min,
  max,
  step,
  error,
  onChange,
  onBlur,
}) => {
  const inputProps = useMemo(() => {
    if (min != null && max != null) return { inputProps: { min, max, step } };
    if (min != null && max == null) return { inputProps: { min, step } };
    if (max != null && min == null) return { inputProps: { max, step } };

    return { inputProps: { step } };
  }, [min, max, step]);

  return (
    <TextField
      value={value || ''}
      type="number"
      className={clsx({
        'integer-field': true,
        [`${className}`]: className,
      })}
      label={label}
      InputProps={inputProps}
      error={error != null}
      helperText={error}
      InputLabelProps={{ shrink: true }}
      size="small"
      onChange={(e) =>
        onChange(
          Number.isNaN(Number(e.target.value))
            ? undefined
            : Number(e.target.value)
        )
      }
      onBlur={onBlur}
    />
  );
};

BasicNumberField.defaultProps = {
  className: undefined,
  min: undefined,
  max: undefined,
  step: 1,
  error: undefined,
};

export default BasicNumberField;
