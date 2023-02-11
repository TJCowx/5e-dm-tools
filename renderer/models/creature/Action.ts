import { Schema, Types } from 'mongoose';
import ActionType from './ActionType';
import { AttackDelivery, AttackType } from './AttackType';
import Damage, { DamageSchema } from './Damage';

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

export type ActionDoc = Action & { _id: Types.ObjectId };

export const ActionSchema = new Schema<Action>({
  name: { type: String, required: [true, 'Name is required'] },
  actionType: { type: String, required: [true, 'Action type is required'] },
  description: { type: String },
  isAttack: Boolean,
  attackDelivery: String,
  attackType: String,
  toHit: Number,
  damage: [DamageSchema],
  reach: Number,
  combatantsHit: Number,
});

export default Action;
