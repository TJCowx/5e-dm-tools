import Creature from 'models/creature/Creature';

type Combatant = {
  id: string;
  name: string;
  initiative: number;
  initiativeModifier: number;
  isPlayer: boolean;
  isDead: boolean;
  isLair?: boolean;
  maxHp?: number;
  currentHp?: number;
  stats?: Creature;
};

export default Combatant;
