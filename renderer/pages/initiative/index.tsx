import { Divider, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';
import Layout from 'components/Layout/Layout';
import ListItemText from 'components/List/ListItemText';
import { MonsterModel } from 'models/monster/Monster';
import { FC, Fragment, useState } from 'react';

const PageContainer = styled('div')(() => ({
  display: 'flex',
  maxHeight: '100%',
  height: '100%',
}));

const InitiativeContainer = styled(List)(() => ({
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  minWidth: '250px',
  maxWidth: '250px',
}));

const MonsterContainer = styled('div')(() => ({}));

type Combatant = {
  combatantId: number;
  name: string;
  initiative: number;
  isPlayer: boolean;
};

const testCombatants: Combatant[] = [
  { combatantId: 1, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 2, name: 'Monster A', initiative: 20, isPlayer: false },
  { combatantId: 3, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 4, name: 'Monster A', initiative: 20, isPlayer: false },
  { combatantId: 5, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 6, name: 'Monster A', initiative: 20, isPlayer: false },
  { combatantId: 7, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 8, name: 'Monster A', initiative: 20, isPlayer: false },
  { combatantId: 9, name: 'Player 1', initiative: 23, isPlayer: true },
  { combatantId: 10, name: 'Monster A', initiative: 20, isPlayer: false },
];

const InitiativePage: FC = () => {
  const [players, setPlayers] = useState([]);
  const [activeMonsters, setActiveMonsters] = useState<MonsterModel[]>([]);
  const [combatants, setCombatants] = useState<Combatant[]>([]);

  return (
    <Layout title="Initiative" disablePadding>
      <PageContainer>
        <InitiativeContainer className="scroll-enabled" dense>
          {testCombatants.map((c) => (
            <Fragment key={c.combatantId}>
              <ListItem>
                <ListItemText
                  primary={c.name}
                  secondary={`Initiative: ${c.initiative}`}
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </InitiativeContainer>
        <MonsterContainer className="scroll-enabled">Monster</MonsterContainer>
      </PageContainer>
    </Layout>
  );
};

export default InitiativePage;
