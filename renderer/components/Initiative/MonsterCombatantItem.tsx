import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Combatant from 'models/initiative/Combatant';
import { FC, useState } from 'react';

type Props = {
  combatant: Combatant;
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
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  // borderTop: '1px solid',
}));

const MonsterCombatantItem: FC<Props> = ({ combatant }) => {
  const { id, monsterStats } = combatant;
  const panelHeaderId = `panel-${id}-header`;
  const panelContentId = `panel-${id}-content`;

  const [currentHp, setCurrentHp] = useState(monsterStats.hitPoints);

  return (
    <StyledAccordion disableGutters elevation={0} square>
      <StyledAccordionSummary
        id={panelHeaderId}
        aria-controls={panelContentId}
        expandIcon={<ExpandMoreIcon />}
      >
        <SummaryContent>
          {combatant.name}
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
        Here is some info
        <br />
        <br />
        <br />
        <br />
        Another thing
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default MonsterCombatantItem;
