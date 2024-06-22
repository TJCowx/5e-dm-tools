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
  damages: Partial<Damage>[] | null;
  reach: number | null;

  actionTypeId: number | null;
  attackDeliveryId: number | null;
  attackTypeId: number | null;
  creatureId?: number;

  actionType: ActionType | null;
  attackDelivery: AttackDelivery | null;
  attackType: AttackType | null;
};

export default Action;
