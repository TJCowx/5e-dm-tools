import Action from 'models/creature/Action';
import { Schema, Types } from 'mongoose';
import DamageSchema from './DamageSchema';

export type ActionDoc = Action & { _id: Types.ObjectId };

const ActionSchema = new Schema<Action>({
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

export default ActionSchema;
