import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage from './Damage';

type Action = {
  id: number;
  name: string;
  description: string;
  isAttack: boolean;
  toHit: number | null;
  combatantsHit: number | null;
  damage: Damage[] | null;
  reach: number | null;

  actionTypeId: number | null;
  attackDeliveryId: number | null;
  attackTypeId: number | null;

  actionType: ActionType | null;
  attackDelivery: AttackDelivery | null;
  attackType: AttackType | null;
};

export default Action;
