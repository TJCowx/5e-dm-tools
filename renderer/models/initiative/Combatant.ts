import { MonsterModel } from 'models/monster/Monster';

type Combatant = {
  id: string;
  name: string;
  initiative: number;
  initiativeModifier: number;
  isPlayer: boolean;
  isDead: boolean;
  maxHp?: number;
  currentHp?: number;
  monsterStats?: MonsterModel;
};

export default Combatant;
