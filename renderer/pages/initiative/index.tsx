import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@mui/material';
import { cyan, red } from '@mui/material/colors';
import { styled } from '@mui/system';
import clsx from 'clsx';
import InitiativeListItem from 'components/Initiative/InitiativeListItem';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import Combatant from 'models/initiative/Combatant';
import { MonsterModel } from 'models/monster/Monster';
import { FC, Fragment, useState } from 'react';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

const InitiativeContainer = styled('div')(() => ({
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  minWidth: '250px',
  maxWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  '& .action-container': {
    padding: '4px',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    '& button': {
      width: '100%',
    },
  },
}));

const InitiativeList = styled(List)(() => ({
  '& .active': {
    background: cyan[50],
    '&.is-monster': {
      background: red[50],
    },
  },
}));

const MonsterContainer = styled('div')(() => ({
  padding: '12px',
  flexGrow: 1,
}));

const StyledFab = styled(Fab)(() => ({
  position: 'absolute',
  bottom: 16,
  right: 16,
}));

const testCombatants: Combatant[] = [
  { id: 1, name: 'Player 1', initiative: 23, isPlayer: true },
  { id: 2, name: 'Monster A', initiative: 20, isPlayer: false },
  { id: 3, name: 'Player 2', initiative: 20, isPlayer: true },
  { id: 4, name: 'Monster B', initiative: 19, isPlayer: false },
  { id: 5, name: 'Player 3', initiative: 18, isPlayer: true },
  { id: 6, name: 'Monster C', initiative: 15, isPlayer: false },
  { id: 7, name: 'Player 4', initiative: 10, isPlayer: true },
  { id: 8, name: 'Monster D', initiative: 5, isPlayer: false },
  { id: 10, name: 'Monster E', initiative: 4, isPlayer: false },
];

const InitiativePage: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [activeMonsters, setActiveMonsters] = useState<MonsterModel[]>([]);
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [activeId, setActiveId] = useState<number>(2);

  return (
    <Layout title="Initiative" disablePadding>
      <PageContainer>
        <InitiativeContainer>
          <InitiativeList
            className="scroll-enabled"
            dense
            subheader={<ListSubheader>Initiative</ListSubheader>}
          >
            {testCombatants.map((c) => (
              <Fragment key={c.id}>
                <InitiativeListItem
                  combatant={c}
                  isActive={c.id === activeId}
                />
                <Divider />
              </Fragment>
            ))}
          </InitiativeList>
          <div className="action-container">
            <Button variant="contained">Start</Button>
          </div>
        </InitiativeContainer>
        <MonsterContainer className="scroll-enabled">
          <StyledFab color="primary" aria-label="Add Combatant" size="small">
            <AddIcon />
          </StyledFab>
        </MonsterContainer>
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
