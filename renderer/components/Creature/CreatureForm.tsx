import styled from '@emotion/styled';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, IconButton, List, Typography } from '@mui/material';
import EditAbilityButton from 'components/Ability/EditAbilityButton';
import NewAbilityListItem from 'components/Ability/NewAbilityListItem';
import NewActionListItem from 'components/Action/NewActionListItem';
import RHFAttributeField from 'components/Fields/RHF/RHFAttributeField';
import RHFCheckboxField from 'components/Fields/RHF/RHFCheckboxField';
import RHFIntegerField from 'components/Fields/RHF/RHFIntegerField';
import RHFMultiselectField from 'components/Fields/RHF/RHFMultiselectField';
import RHFSelectField from 'components/Fields/RHF/RHFSelectField';
import RHFTextField from 'components/Fields/RHF/RHFTextField';
import ListItemText from 'components/List/ListItemText';
import ListItemTwoSecondaryActions from 'components/List/ListItemTwoSecondaryActions';
import { AlignmentSelectOptions } from 'models/creature/Alignment';
import { AttributeSelectOptions } from 'models/creature/Attribute';
import { ConditionTypeSelectOptions } from 'models/creature/ConditionType';
import { CreatureModel } from 'models/creature/Creature';
import { CreatureSizeSelectOptions } from 'models/creature/CreatureSize';
import { CreatureTypeSelectOptions } from 'models/creature/CreatureType';
import { DamageTypeSelectOptions } from 'models/creature/DamageType';
import { LanguageSelectOptions } from 'models/creature/Language';
import { ProficiencySelectOptions } from 'models/creature/Proficiency';
import { FC, FormEventHandler, Fragment } from 'react';
import { Control, useFieldArray, UseFormWatch } from 'react-hook-form';

import ActionListItem from './ActionListItem';

type Props = {
  control: Control<CreatureModel>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  watch: UseFormWatch<CreatureModel>;
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

const CreatureForm: FC<Props> = ({ control, onSubmit, watch }) => {
  const {
    fields: abilities,
    append: appendAbility,
    remove: removeAbility,
    update: updateAbility,
  } = useFieldArray({ control, name: 'abilities' });

  const {
    fields: actions,
    append: appendAction,
    remove: removeAction,
    update: updateAction,
  } = useFieldArray({ control, name: 'actions' });

  const isLegendary = watch('isLegendary');
  const hasLair = watch('hasLair');

  return (
    <StyledForm className="pb-40" onSubmit={onSubmit}>
      <section>
        <Typography variant="h6">Description</Typography>
        <Divider />
        <div className="grid mb-16">
          <RHFTextField
            fieldName="name"
            label="Name"
            control={control}
            isRequired
          />
          <div className="row-of-fields align-start">
            <RHFCheckboxField
              fieldName="isLegendary"
              label="Is Legendary"
              control={control}
            />
            <RHFCheckboxField
              fieldName="hasLair"
              label="Has Lair"
              control={control}
            />
          </div>
        </div>
        <div className="grid mb-16">
          <RHFSelectField
            id="size"
            fieldName="size"
            control={control}
            label="Size"
            options={CreatureSizeSelectOptions}
          />
          <RHFSelectField
            id="type"
            fieldName="type"
            control={control}
            label="Type"
            options={CreatureTypeSelectOptions}
          />
          <RHFSelectField
            id="alignment"
            fieldName="alignment"
            control={control}
            label="Alignment"
            options={AlignmentSelectOptions}
          />
        </div>
        <div className="grid">
          <RHFMultiselectField
            id="languages-field"
            fieldName="languages"
            control={control}
            label="Languages"
            options={LanguageSelectOptions}
          />
          <RHFIntegerField
            control={control}
            fieldName="challengeRating"
            label="Challenge Rating"
            min={0}
            isRequired
          />
          <RHFIntegerField
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
          <RHFIntegerField
            control={control}
            label="Land Speed"
            fieldName="landSpeed"
          />
          <RHFIntegerField
            control={control}
            label="Fly Speed"
            fieldName="flySpeed"
          />
          <RHFIntegerField
            control={control}
            label="Burrow Speed"
            fieldName="burrowSpeed"
          />
          <RHFIntegerField
            control={control}
            label="Climb Speed"
            fieldName="climbSpeed"
          />
          <RHFIntegerField
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
          <RHFIntegerField
            control={control}
            label="Blindsight"
            fieldName="blindsight"
          />
          <RHFIntegerField
            control={control}
            label="Darkvision"
            fieldName="darkvision"
          />
          <RHFIntegerField
            control={control}
            label="Tremorsense"
            fieldName="tremorsense"
          />
          <RHFIntegerField
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
          <RHFAttributeField
            fieldName="strength"
            label="Strength"
            control={control}
          />
          <RHFAttributeField
            fieldName="dexterity"
            label="Dexterity"
            control={control}
          />
          <RHFAttributeField
            fieldName="constitution"
            label="Constitution"
            control={control}
          />
          <RHFAttributeField
            fieldName="intelligence"
            label="Intelligence"
            control={control}
          />
          <RHFAttributeField
            fieldName="wisdom"
            label="Wisdom"
            control={control}
          />
          <RHFAttributeField
            fieldName="charisma"
            label="Charisma"
            control={control}
          />
        </div>
        <div className="grid">
          <RHFIntegerField
            fieldName="profBonus"
            label="Proficiency Bonus"
            control={control}
            min={0}
            isRequired
          />
          <RHFIntegerField
            fieldName="armourClass"
            label="Armour Class"
            control={control}
            min={0}
            isRequired
          />
          <RHFIntegerField
            fieldName="hitPoints"
            label="Hit Points"
            control={control}
            min={0}
            isRequired
          />
          <RHFTextField
            fieldName="hitDie"
            label="Hit Die"
            control={control}
            isRequired
          />
        </div>
      </section>
      <section>
        <Typography variant="h6">Proficiencies</Typography>
        <Divider />
        <div className="grid">
          <RHFMultiselectField
            id="prof-field"
            control={control}
            label="Proficiencies"
            fieldName="proficiencies"
            options={ProficiencySelectOptions}
          />
          <RHFMultiselectField
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
          <RHFMultiselectField
            id="immunities-field"
            control={control}
            label="Immunities"
            fieldName="immunities"
            options={DamageTypeSelectOptions}
          />
          <RHFMultiselectField
            id="cond-immunities-field"
            control={control}
            label="Condition Immunities"
            fieldName="condImmunities"
            options={ConditionTypeSelectOptions}
          />
          <RHFMultiselectField
            id="resistances-field"
            control={control}
            label="Resistances"
            fieldName="resistances"
            options={DamageTypeSelectOptions}
          />
          <RHFMultiselectField
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
          {abilities.map((ability, i) => (
            <Fragment key={ability.name}>
              <ListItemTwoSecondaryActions
                secondaryAction={
                  <>
                    <EditAbilityButton
                      ability={ability}
                      onSave={(updated) => updateAbility(i, updated)}
                    />
                    <IconButton
                      aria-label={`Delete ${ability.name}`}
                      edge="end"
                      color="warning"
                      onClick={() => removeAbility(i)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={ability.name}
                  secondary={ability.description}
                />
              </ListItemTwoSecondaryActions>
              <Divider />
            </Fragment>
          ))}
          <NewAbilityListItem
            onSave={(newAbility) => appendAbility(newAbility)}
          />
        </List>
      </section>
      <section>
        <Typography variant="h6">Actions</Typography>
        <Divider />
        <List className="item-list" dense>
          {actions.map((action, i) => (
            <ActionListItem
              key={action.name}
              action={action}
              isLegendary={isLegendary}
              hasLair={hasLair}
              onEdit={(updated) => updateAction(i, updated)}
              onDelete={() => removeAction(i)}
            />
          ))}
          <NewActionListItem
            isLegendary={isLegendary}
            hasLair={hasLair}
            onSave={(newAction) => appendAction(newAction)}
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

export default CreatureForm;
