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
import FormattedStat from 'components/Monster/FormattedStat';
import Combatant from 'models/initiative/Combatant';
import Action from 'models/monster/Action';
import { FC, useEffect, useRef, useState } from 'react';
import {
  getProficienciesString,
  getSavingThrowsString,
  getSpeedString,
} from 'utils/monsterUtils';

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

const MonsterCombatantItem: FC<Props> = ({
  combatant,
  isExpanded,
  onChange,
}) => {
  const { id, monsterStats } = combatant;
  const panelHeaderId = `panel-${id}-header`;
  const panelContentId = `panel-${id}-content`;

  const hasLoaded = useRef(false);
  const [currentHp, setCurrentHp] = useState(`${monsterStats.hitPoints}`);
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

    monsterStats.actions.forEach((act) => {
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
  }, [monsterStats.actions]);

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
              {currentHp} / {monsterStats.hitPoints}
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
                  / {monsterStats.hitPoints}
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="stats-container m-16">
          <FormattedStat label="Strength" value={monsterStats.strength} />
          <FormattedStat label="Dexterity" value={monsterStats.dexterity} />
          <FormattedStat
            label="Constitution"
            value={monsterStats.constitution}
          />
          <FormattedStat
            label="Intelligence"
            value={monsterStats.intelligence}
          />
          <FormattedStat label="Wisdom" value={monsterStats.wisdom} />
          <FormattedStat label="Charisma" value={monsterStats.charisma} />
        </div>
        <Divider className="my-16" />
        <div className="m-16">
          <LabelValueRow
            label="Armour Class"
            value={`${monsterStats.armourClass}`}
          />
          <LabelValueRow label="Speed" value={getSpeedString(monsterStats)} />
          <LabelValueRow
            label="Saving Throws"
            value={getSavingThrowsString(monsterStats)}
          />
          {!!monsterStats.proficiencies.length && (
            <LabelValueRow
              label="Proficiencies"
              value={getProficienciesString(monsterStats)}
            />
          )}
          {!!monsterStats.immunities.length && (
            <LabelValueRow
              label="Damage Immunities"
              value={monsterStats.immunities.join(' | ')}
            />
          )}
          {!!monsterStats.condImmunities.length && (
            <LabelValueRow
              label="Condition Immunities"
              value={monsterStats.condImmunities.join(' | ')}
            />
          )}
          {!!monsterStats.resistances.length && (
            <LabelValueRow
              label="Resistances"
              value={monsterStats.resistances.join(' | ')}
            />
          )}
          {!!monsterStats.weaknesses.length && (
            <LabelValueRow
              label="Weaknesses"
              value={monsterStats.weaknesses.join(' | ')}
            />
          )}
          {!!monsterStats.languages.length && (
            <LabelValueRow
              label="Languages"
              value={monsterStats.languages.join(' | ')}
            />
          )}
        </div>
        {(!!monsterStats.abilities.length || monsterStats.isLegendary) && (
          <>
            <Divider className="my-16" />
            <div className="abilities-container, m-16">
              {monsterStats.abilities.map((ability) => (
                <AbilityFormat
                  key={`${combatant.id}-${ability.name}`}
                  ability={ability}
                />
              ))}
              {monsterStats.isLegendary && (
                <AbilityFormat
                  ability={{
                    id: undefined,
                    name: 'Legendary Resistance (3/Day)',
                    description: `If the ${monsterStats.name} fails a saving throw, it can choose to succeed instead.`,
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

export default MonsterCombatantItem;
