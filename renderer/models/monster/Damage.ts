import { Schema, Types } from 'mongoose';
import DamageType from './DamageType';

type Damage = {
  id: string;
  damage: string;
  damageDice: string;
  type: DamageType;
};

export type DamageDoc = Damage & { _id: Types.ObjectId };

export const DamageSchema = new Schema<Damage>({
  damage: { type: String, required: [true, 'Damage is required'] },
  damageDice: { type: String, required: [true, 'Damage dice is required'] },
  type: { type: String, required: [true, 'Damage type is required'] },
});

export default Damage;
