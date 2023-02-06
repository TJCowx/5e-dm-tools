import Ability from 'models/creature/Ability';
import { LeanDocument, Schema, Types } from 'mongoose';

export type AbilityDoc = LeanDocument<Ability> & {
  _id: Types.ObjectId;
};

const AbilitySchema = new Schema<Ability>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
});

export default AbilitySchema;
