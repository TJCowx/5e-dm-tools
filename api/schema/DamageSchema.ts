import Damage from 'models/creature/Damage';
import { Schema, Types } from 'mongoose';

export type DamageDoc = Damage & { _id: Types.ObjectId };

const DamageSchema = new Schema<Damage>({
  damage: { type: String, required: [true, 'Damage is required'] },
  damageDice: { type: String, required: [true, 'Damage dice is required'] },
  type: { type: String, required: [true, 'Damage type is required'] },
});

export default DamageSchema;
