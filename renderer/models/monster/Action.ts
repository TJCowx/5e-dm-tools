import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage from './Damage';

type Action = {
  name: string;
  description: string;
  actionType: ActionType;
  isAttack: boolean;
  attackDelivery: AttackDelivery;
  attackType: AttackType;
  toHit: number;
  damage: Damage[];
  reach: number;
};

export default Action;
