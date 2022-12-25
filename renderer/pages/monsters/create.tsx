import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
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
  isLegendary: boolean;
  hasLair: boolean;
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
  isLegendary: false,
  hasLair: false,
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
  maxWidth: '1200px',
  margin: '24px auto 0',
  '& .row-of-fields': {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '12px',
    rowGap: '12px',
    '& > *': { flexShrink: 0 },
    '& .form-select': {
      flexGrow: 1,
    },
  },
  '& > section': {
    '& hr': { margin: '8px 0' },
    marginBottom: '32px',
  },
  '& .attributes-container': {
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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Typography variant="h6">Description</Typography>
          <Divider />
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
          <div className="row-of-fields">
            <Controller
              name="isLegendary"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Is Legendary"
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              )}
            />
            <Controller
              name="hasLair"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Has Lair"
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              )}
            />
          </div>
          <div className="row-of-fields property-container">
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
        </section>
        <section>
          <Typography variant="h6">Movement</Typography>
          <Divider />
          <div className="speed-container">TODO Movement Here</div>
        </section>
        <section>
          <Typography variant="h6">Senses</Typography>
          <Divider />
          <div className="senses-container">TODO Senses Here</div>
        </section>
        <section>
          <Typography variant="h6">Stats</Typography>
          <Divider />
          <div className="row-of-fields attributes-container">
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
            <AttributeField
              fieldName="wisdom"
              label="Wisdom"
              control={control}
            />
            <AttributeField
              fieldName="charisma"
              label="Charisma"
              control={control}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6">Proficiencies</Typography>
          <Divider />
          <div>TODO Proficiencies, Saving Throws Here</div>
        </section>
        <section>
          <Typography variant="h6">Damage Properties</Typography>

          <Divider />
          <div>TODO Damage Immunities, Weaknesses Here</div>
        </section>
        <section>
          <Typography variant="h6">Abilities</Typography>

          <Divider />
          <div>TODO Abilities Here</div>
        </section>
        <section>
          <Typography variant="h6">Actions</Typography>

          <Divider />
          <div>TODO Actions Here</div>
        </section>
        <Button type="submit">Save</Button>
      </StyledForm>
    </Layout>
  );
};

export default CreateMonster;
