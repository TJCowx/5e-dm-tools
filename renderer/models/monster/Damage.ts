import { Schema } from 'mongoose';
import DamageType from './DamageType';

type Damage = {
  damage: string;
  type: DamageType;
};

export const DamageSchema = new Schema<Damage>({
  damage: { type: String, required: [true, 'Damage is required'] },
  type: { type: String, required: [true, 'Damage type is required'] },
});

export default Damage;
