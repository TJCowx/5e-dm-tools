import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import DeadIcon from 'components/Icons/DeadIcon';
import AbilityFormat from 'components/LabelValue/AbilityFormat';
import LabelValueRow from 'components/LabelValue/LabelValueRow';
import FormattedStat from 'components/Creature/FormattedStat';
import Combatant from 'models/initiative/Combatant';
import Action from 'models/creature/Action';
import { FC, useEffect, useRef, useState } from 'react';
import {
  getProficienciesString,
  getSavingThrowsString,
  getSpeedString,
} from 'utils/creatureUtils';

import ActionList from './ActionList';

type Props = {
  combatant: Combatant;
  isExpanded: boolean;
  onChange: () => void;
};

const StyledAccordion = styled(Accordion)(() => ({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  '&:before': { height: 0 },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : '#2c313c',
}));

const SummaryContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginRight: '12px',
  '& .name-container': {
    display: 'flex',
    alignItems: 'center',
    '& svg': { marginRight: '12px' },
  },
  '& .end-slot-container': {
    color: theme.palette.tonalOffset,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  '& .stats-container': {
    display: 'flex',
    columnGap: '12px',
  },
  '& .ability-container': {
    marginBottom: '8px',
  },
}));

const CreatureCombatantItem: FC<Props> = ({
  combatant,
  isExpanded,
  onChange,
}) => {
  const { id, stats } = combatant;
  const panelHeaderId = `panel-${id}-header`;
  const panelContentId = `panel-${id}-content`;

  const hasLoaded = useRef(false);
  const [currentHp, setCurrentHp] = useState(`${stats.hitPoints}`);
  const [actions, setActions] = useState<Action[]>([]);
  const [legendaryActions, setLegendaryActions] = useState<Action[]>([]);
  const [lairActions, setLairActions] = useState<Action[]>([]);
  const [reactions, setReactions] = useState<Action[]>([]);

  useEffect(() => {
    if (hasLoaded.current) {
      setCurrentHp(combatant.isDead ? '0' : '1');
    } else {
      hasLoaded.current = true;
    }
  }, [combatant.isDead]);

  useEffect(() => {
    const newActions: Action[] = [];
    const newLegendaryActions: Action[] = [];
    const newLairActions: Action[] = [];
    const newReactions: Action[] = [];

    stats.actions.forEach((act) => {
      switch (act.actionType) {
        case 'Action':
          newActions.push(act);
          break;
        case 'Reaction':
          newReactions.push(act);
          break;
        case 'Legendary':
          newLegendaryActions.push(act);
          break;
        case 'Lair':
          newLairActions.push(act);
          break;
        default:
      }
    });

    setActions(newActions);
    setLegendaryActions(newLegendaryActions);
    setReactions(newReactions);
    setLairActions(newLairActions);
  }, [stats.actions]);

  return (
    <StyledAccordion
      disableGutters
      elevation={0}
      square
      expanded={isExpanded}
      onChange={onChange}
    >
      <StyledAccordionSummary
        id={panelHeaderId}
        aria-controls={panelContentId}
        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        <SummaryContent>
          <span className="name-container">
            {combatant.isDead && <DeadIcon />}
            {combatant.name}
          </span>
          <Typography variant="body2" className="end-slot-container">
            <span className="hp-container">
              {currentHp} / {stats.hitPoints}
            </span>
          </Typography>
        </SummaryContent>
      </StyledAccordionSummary>
      <StyledAccordionDetails id={panelContentId}>
        <div>
          <TextField
            label="Current HP"
            type="number"
            className="mx-16 mt-12"
            value={currentHp}
            size="small"
            onChange={(e) => setCurrentHp(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  / {stats.hitPoints}
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="stats-container m-16">
          <FormattedStat label="Strength" value={stats.strength} />
          <FormattedStat label="Dexterity" value={stats.dexterity} />
          <FormattedStat label="Constitution" value={stats.constitution} />
          <FormattedStat label="Intelligence" value={stats.intelligence} />
          <FormattedStat label="Wisdom" value={stats.wisdom} />
          <FormattedStat label="Charisma" value={stats.charisma} />
        </div>
        <Divider className="my-16" />
        <div className="m-16">
          <LabelValueRow label="Armour Class" value={`${stats.armourClass}`} />
          <LabelValueRow label="Speed" value={getSpeedString(stats)} />
          <LabelValueRow
            label="Saving Throws"
            value={getSavingThrowsString(stats)}
          />
          {!!stats.proficiencies.length && (
            <LabelValueRow
              label="Proficiencies"
              value={getProficienciesString(stats)}
            />
          )}
          {!!stats.immunities.length && (
            <LabelValueRow
              label="Damage Immunities"
              value={stats.immunities.join(' | ')}
            />
          )}
          {!!stats.condImmunities.length && (
            <LabelValueRow
              label="Condition Immunities"
              value={stats.condImmunities.join(' | ')}
            />
          )}
          {!!stats.resistances.length && (
            <LabelValueRow
              label="Resistances"
              value={stats.resistances.join(' | ')}
            />
          )}
          {!!stats.weaknesses.length && (
            <LabelValueRow
              label="Weaknesses"
              value={stats.weaknesses.join(' | ')}
            />
          )}
          {!!stats.languages.length && (
            <LabelValueRow
              label="Languages"
              value={stats.languages.join(' | ')}
            />
          )}
        </div>
        {(!!stats.abilities.length || stats.isLegendary) && (
          <>
            <Divider className="my-16" />
            <div className="abilities-container, m-16">
              {stats.abilities.map((ability) => (
                <AbilityFormat
                  key={`${combatant.id}-${ability.name}`}
                  ability={ability}
                />
              ))}
              {stats.isLegendary && (
                <AbilityFormat
                  ability={{
                    id: undefined,
                    name: 'Legendary Resistance (3/Day)',
                    description: `If the ${stats.name} fails a saving throw, it can choose to succeed instead.`,
                  }}
                />
              )}
            </div>
          </>
        )}
        {!!actions.length && (
          <>
            <Divider className="my-16" />
            <ActionList label="Actions" actions={actions} className="m-16" />
          </>
        )}
        {!!reactions.length && (
          <>
            <Divider className="my-16" />
            <ActionList
              label="Reactions"
              actions={reactions}
              className="m-16"
            />
          </>
        )}
        {!!legendaryActions.length && (
          <>
            <Divider className="my-16" />
            <ActionList
              label="Legendary Actions"
              actions={legendaryActions}
              className="m-16"
            />
          </>
        )}
        {!!lairActions.length && (
          <>
            <Divider className="my-16" />
            <ActionList
              label="Lair Actions"
              actions={lairActions}
              className="m-16"
            />
          </>
        )}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default CreatureCombatantItem;
