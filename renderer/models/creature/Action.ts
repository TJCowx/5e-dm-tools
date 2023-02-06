import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage from './Damage';

type Action = {
  id: string;
  name: string;
  description: string;
  actionType: ActionType;
  isAttack: boolean;
  attackDelivery: AttackDelivery;
  attackType: AttackType;
  toHit: number;
  combatantsHit: number;
  damage: Damage[];
  reach: number;
};

export default Action;
