import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import AttributeField from 'components/Fields/AttributeField';
import SelectField from 'components/Fields/SelectField';
import Layout from 'components/Layout/Layout';
import MonsterSize, { AllMonsterSizes } from 'models/monster/MonsterSize';
import MonsterType, { AllMonsterTypes } from 'models/monster/MonsterType';
import Alignment, { AllAlignments } from 'models/monster/Alignment';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

type FormFields = {
  name: string;

  size: MonsterSize;
  type: MonsterType;
  alignment: Alignment;

  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  wisdom: number;
  charisma: number;
  profBonus: number;
};

const DefaultValues: FormFields = {
  name: '',
  size: undefined,
  type: undefined,
  alignment: undefined,
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  constitution: 10,
  wisdom: 10,
  charisma: 10,
  profBonus: 0,
};

const MonsterSizeOptions = AllMonsterSizes.map((size) => ({
  value: size,
  text: size,
}));

const MonsterTypeOptions = AllMonsterTypes.map((type) => ({
  value: type,
  text: type,
}));

const AlignmentOptions = AllAlignments.map((alignment) => ({
  value: alignment,
  text: alignment,
}));

const StyledForm = styled('form')(() => ({
  '& .attributes-container': {
    display: 'flex',
    columnGap: '12px',
    rowGap: '12px',
    flexWrap: 'wrap',
    '& .attribute-field': {
      flexShrink: 0,
    },
  },
}));

const CreateMonster = () => {
  const { handleSubmit, control } = useForm<FormFields>({
    defaultValues: DefaultValues,
  });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <Layout title="Create Monster">
      <Link href="/monsters" passHref>
        <IconButton aria-label="Go to monsters list">
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Typography variant="h5">New Monster</Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Name"
              error={fieldState.error != null}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div>
          <SelectField
            id="size"
            fieldName="size"
            control={control}
            label="Size"
            options={MonsterSizeOptions}
          />
          <SelectField
            id="type"
            fieldName="type"
            control={control}
            label="Type"
            options={MonsterTypeOptions}
          />
          <SelectField
            id="alignment"
            fieldName="alignment"
            control={control}
            label="Alignment"
            options={AlignmentOptions}
          />
        </div>
        <div className="speed-container">TODO put stuff here</div>
        <div className="attributes-container">
          <AttributeField
            fieldName="strength"
            label="Strength"
            control={control}
          />
          <AttributeField
            fieldName="dexterity"
            label="Dexterity"
            control={control}
          />
          <AttributeField
            fieldName="constitution"
            label="Constitution"
            control={control}
          />
          <AttributeField
            fieldName="intelligence"
            label="Intelligence"
            control={control}
          />
          <AttributeField fieldName="wisdom" label="Wisdom" control={control} />
          <AttributeField
            fieldName="charisma"
            label="Charisma"
            control={control}
          />
        </div>
        <Button type="submit">Save</Button>
      </StyledForm>
    </Layout>
  );
};

export default CreateMonster;
