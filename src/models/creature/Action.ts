import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage from './Damage';

type Action = {
  name: string;
  description: string;
  actionType: ActionType | null;
  isAttack: boolean;
  attackDelivery: AttackDelivery | null;
  attackType: AttackType | null;
  toHit: number | null;
  combatantsHit: number | null;
  damage: Damage[] | null;
  reach: number | null;
};

export default Action;
