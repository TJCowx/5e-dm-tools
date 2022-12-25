import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, styled, Typography } from '@mui/material';
import AttributeField from 'components/Fields/AttributeField';
import Layout from 'components/Layout/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormFields = {
  name: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  wisdom: number;
  charisma: number;
  profBonus: number;
};

const StyledForm = styled('form')(({ theme }) => ({
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
    defaultValues: {
      name: '',
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
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
