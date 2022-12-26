import { Schema } from 'mongoose';
import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage, { DamageSchema } from './Damage';

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

export const ActionSchema = new Schema<Action>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  actionType: { type: String, required: [true, 'Action type is required'] },
  isAttack: Boolean,
  attackDelivery: String,
  attackType: String,
  toHit: Number,
  damage: [DamageSchema],
  reach: Number,
});

export default Action;
