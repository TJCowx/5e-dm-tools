import { MdExpandMore } from 'react-icons/md';
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
import LabelValueRow from 'components/LabelValue/LabelValueRow';
import FormattedStat from 'components/Monster/FormattedStat';
import Combatant from 'models/initiative/Combatant';
import { FC, useEffect, useRef, useState } from 'react';
import {
  getProficienciesString,
  getSavingThrowsString,
  getSpeedString,
} from 'utils/monsterUtils';
import DeadIcon from 'components/Icons/DeadIcon';
import AbilityFormat from 'components/LabelValue/AbilityFormat';

type Props = {
  combatant: Combatant;
  isExpanded: boolean;
  onChange: () => void;
};

const StyledAccordion = styled(Accordion)(() => ({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  '&:before': { height: 0 },
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: grey[100],
}));

const SummaryContent = styled('div')(() => ({
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
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  '& .stats-container': {
    display: 'flex',
    columnGap: '12px',
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

  useEffect(() => {
    if (hasLoaded.current) {
      setCurrentHp(combatant.isDead ? '0' : '1');
    } else {
      hasLoaded.current = true;
    }
  }, [combatant.isDead]);

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
        expandIcon={<MdExpandMore />}
      >
        <SummaryContent>
          <span className="name-container">
            {combatant.isDead && <DeadIcon />}
            {combatant.name}
          </span>
          <Typography
            variant="body2"
            color="GrayText"
            className="end-slot-container"
          >
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
        {!!monsterStats.abilities.length && (
          <>
            <Divider className="my-16" />
            <div className="m-16">
              {monsterStats.abilities.map((ability) => (
                <AbilityFormat
                  key={`${combatant.id}-${ability.name}`}
                  ability={ability}
                />
              ))}
            </div>
          </>
        )}
        <Divider className="my-16" />
        <div className="m-16">Actions Here</div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default MonsterCombatantItem;
