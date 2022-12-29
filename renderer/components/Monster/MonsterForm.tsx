import styled from '@emotion/styled';
import { Button, Divider, List, ListItem, Typography } from '@mui/material';
import AbilityModal from 'components/AbilityModal/AbilityModal';
import ActionModal from 'components/ActionModal.tsx/ActionModal';
import AttributeField from 'components/Fields/AttributeField';
import CheckboxField from 'components/Fields/CheckboxField';
import IntegerField from 'components/Fields/IntegerField';
import MultiselectField from 'components/Fields/MultiselectField';
import SelectField from 'components/Fields/SelectField';
import TextField from 'components/Fields/TextField';
import ListItemText from 'components/List/ListItemText';
import { AlignmentSelectOptions } from 'models/monster/Alignment';
import { AttributeSelectOptions } from 'models/monster/Attribute';
import { ConditionTypeSelectOptions } from 'models/monster/ConditionType';
import { DamageTypeSelectOptions } from 'models/monster/DamageType';
import { LanguageSelectOptions } from 'models/monster/Language';
import { MonsterModel } from 'models/monster/Monster';
import { MonsterSizeSelectOptions } from 'models/monster/MonsterSize';
import { MonsterTypeSelectOptions } from 'models/monster/MonsterType';
import { ProficiencySelectOptions } from 'models/monster/Proficiency';
import { FC, FormEventHandler, Fragment, useEffect } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import ActionListItem from './ActionListItem';

type Props = {
  control: Control<MonsterModel>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<MonsterModel>;
  watch: UseFormWatch<MonsterModel>;
};

const StyledForm = styled('form')(() => ({
  '& .row-of-fields': {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '12px',
    rowGap: '16px',
    '& > *': { flexShrink: 0 },
    '& .form-select': { flexGrow: 1 },
    '& .integer-field': { width: '120px' },
  },
  '& .mb-16': { marginBottom: '16px' },
  '& .right-align': { marginLeft: 'auto' },
  '& .grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    rowGap: '16px',
    columnGap: '12px',
  },
  '& section': {
    '& hr': { margin: '8px 0 16px' },
    marginBottom: '32px',
  },
  '& .item-list': {
    padding: '0 16px',
    '& hr': { margin: '0' },
    '& > .MuiListItem-root:first-of-type': {
      paddingTop: '0',
      '& .MuiListItemText-root': {
        marginTop: 0,
      },
    },
  },
  '& .action-container': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const MonsterForm: FC<Props> = ({ control, onSubmit, setValue, watch }) => {
  const abilities = watch('abilities');
  const actions = watch('actions');
  const isLegendary = watch('isLegendary');
  const hasLair = watch('hasLair');

  return (
    <StyledForm className="pb-40" onSubmit={onSubmit}>
      <section>
        <Typography variant="h6">Description</Typography>
        <Divider />
        <div className="grid mb-16">
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
        </div>
        <div className="grid mb-16">
          <SelectField
            id="size"
            fieldName="size"
            control={control}
            label="Size"
            options={MonsterSizeSelectOptions}
          />
          <SelectField
            id="type"
            fieldName="type"
            control={control}
            label="Type"
            options={MonsterTypeSelectOptions}
          />
          <SelectField
            id="alignment"
            fieldName="alignment"
            control={control}
            label="Alignment"
            options={AlignmentSelectOptions}
          />
        </div>
        <div className="grid">
          <MultiselectField
            id="languages-field"
            fieldName="languages"
            control={control}
            label="Languages"
            options={LanguageSelectOptions}
          />
          <IntegerField
            control={control}
            fieldName="challengeRating"
            label="Challenge Rating"
            min={0}
            isRequired
          />
          <IntegerField
            control={control}
            fieldName="rewardXP"
            label="Reward XP"
            min={0}
            isRequired
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Movement</Typography>
        <Divider />
        <div className="row-of-fields">
          <IntegerField
            control={control}
            label="Land Speed"
            fieldName="landSpeed"
          />
          <IntegerField
            control={control}
            label="Fly Speed"
            fieldName="flySpeed"
          />
          <IntegerField
            control={control}
            label="Burrow Speed"
            fieldName="burrowSpeed"
          />
          <IntegerField
            control={control}
            label="Climb Speed"
            fieldName="climbSpeed"
          />
          <IntegerField
            control={control}
            label="Hover Speed"
            fieldName="hoverSpeed"
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Senses</Typography>
        <Divider />
        <div className="row-of-fields">
          <IntegerField
            control={control}
            label="Blindsight"
            fieldName="blindsight"
          />
          <IntegerField
            control={control}
            label="Darkvision"
            fieldName="darkvision"
          />
          <IntegerField
            control={control}
            label="Tremorsense"
            fieldName="tremorsense"
          />
          <IntegerField
            control={control}
            label="Truesight"
            fieldName="truesight"
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Stats</Typography>
        <Divider />
        <div className="row-of-fields mb-16">
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
        <div className="grid">
          <IntegerField
            fieldName="profBonus"
            label="Proficiency Bonus"
            control={control}
            min={0}
            isRequired
          />
          <IntegerField
            fieldName="armourClass"
            label="Armour Class"
            control={control}
            min={0}
            isRequired
          />
          <IntegerField
            fieldName="hitPoints"
            label="Hit Points"
            control={control}
            min={0}
            isRequired
          />
          <TextField fieldName="hitDie" label="Hit Die" control={control} />
        </div>
      </section>
      <section>
        <Typography variant="h6">Proficiencies</Typography>
        <Divider />
        <div className="grid">
          <MultiselectField
            id="prof-field"
            control={control}
            label="Proficiencies"
            fieldName="proficiencies"
            options={ProficiencySelectOptions}
          />
          <MultiselectField
            id="saving-throw-field"
            control={control}
            label="Saving Throws"
            fieldName="savingThrows"
            options={AttributeSelectOptions}
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Damage Properties</Typography>
        <Divider />
        <div className="grid">
          <MultiselectField
            id="immunities-field"
            control={control}
            label="Immunities"
            fieldName="immunities"
            options={DamageTypeSelectOptions}
          />
          <MultiselectField
            id="cond-immunities-field"
            control={control}
            label="Condition Immunities"
            fieldName="condImmunities"
            options={ConditionTypeSelectOptions}
          />
          <MultiselectField
            id="resistances-field"
            control={control}
            label="Resistances"
            fieldName="resistances"
            options={DamageTypeSelectOptions}
          />
          <MultiselectField
            id="weaknesses-field"
            control={control}
            label="Weaknesses"
            fieldName="weaknesses"
            options={DamageTypeSelectOptions}
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Abilities</Typography>
        <Divider />
        <List className="item-list" dense>
          {abilities.map((ability) => (
            <Fragment key={ability.name}>
              <ListItem>
                <ListItemText
                  primary={ability.name}
                  secondary={ability.description}
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
          <AbilityModal
            onSave={(newAbility) =>
              setValue('abilities', [...abilities, newAbility])
            }
          />
        </List>
      </section>
      <section>
        <Typography variant="h6">Actions</Typography>
        <Divider />
        <List className="item-list" dense>
          {actions.map((action) => (
            <ActionListItem key={action.name} action={action} />
          ))}
          <ActionModal
            isLegendary={isLegendary}
            hasLair={hasLair}
            onSave={(newAction) => setValue('actions', [...actions, newAction])}
          />
        </List>
      </section>
      <div className="action-container">
        <Button
          variant="contained"
          disableElevation
          type="submit"
          className="right-align"
        >
          Save
        </Button>
      </div>
    </StyledForm>
  );
};

export default MonsterForm;
