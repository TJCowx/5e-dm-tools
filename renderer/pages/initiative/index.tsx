import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@mui/material';
import { styled } from '@mui/system';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import { MonsterModel } from 'models/monster/Monster';
import { FC, Fragment, useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import clsx from 'clsx';
import { cyan, red } from '@mui/material/colors';

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
}));

type Combatant = {
  combatantId: number;
  name: string;
  initiative: number;
  isPlayer: boolean;
};

const testCombatants: Combatant[] = [
  { combatantId: 1, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 2, name: 'Monster A', initiative: 20, isPlayer: false },
  { combatantId: 3, name: 'Player 2', initiative: 20, isPlayer: true },
  { combatantId: 4, name: 'Monster B', initiative: 19, isPlayer: false },
  { combatantId: 5, name: 'Player 3', initiative: 18, isPlayer: true },
  { combatantId: 6, name: 'Monster C', initiative: 15, isPlayer: false },
  { combatantId: 7, name: 'Player 4', initiative: 10, isPlayer: true },
  { combatantId: 8, name: 'Monster D', initiative: 5, isPlayer: false },
  { combatantId: 10, name: 'Monster E', initiative: 4, isPlayer: false },
];

const InitiativePage: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [activeMonsters, setActiveMonsters] = useState<MonsterModel[]>([]);
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [activeCombatantId, setActiveCombatantId] = useState<number>(2);

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
              <Fragment key={c.combatantId}>
                <ListItem
                  className={clsx({
                    active: c.combatantId === activeCombatantId,
                    'is-monster': !c.isPlayer,
                  })}
                >
                  {c.combatantId === activeCombatantId && (
                    <ListItemIcon>
                      <DoubleArrowIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={c.name}
                    secondary={`Initiative: ${c.initiative}`}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </InitiativeList>
          <div className="action-container">
            <Button variant="contained">Start</Button>
          </div>
        </InitiativeContainer>
        <MonsterContainer className="scroll-enabled">Monster</MonsterContainer>
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
