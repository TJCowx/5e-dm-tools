import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Divider, IconButton, styled, Typography } from '@mui/material';
import AttributeField from 'components/Fields/AttributeField';
import CheckboxField from 'components/Fields/CheckboxField';
import SelectField from 'components/Fields/SelectField';
import TextField from 'components/Fields/TextField';
import Layout from 'components/Layout/Layout';
import Alignment, { AllAlignments } from 'models/monster/Alignment';
import MonsterSize, { AllMonsterSizes } from 'models/monster/MonsterSize';
import MonsterType, { AllMonsterTypes } from 'models/monster/MonsterType';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

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
  margin: '16px auto 0',
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
  '& .grid-3-col': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    rowGap: '12px',
    columnGap: '12px',
  },
  '& > section': {
    '& hr': { margin: '8px 0 12px' },
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
          <TextField fieldName="name" label="Name" control={control} />
          <div className="row-of-fields">
            <CheckboxField
              fieldName="isLegendary"
              label="Is Legendary"
              control={control}
            />
            <CheckboxField
              fieldName="hasLair"
              label="Has Lair"
              control={control}
            />
          </div>
          <div className="grid-3-col">
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
