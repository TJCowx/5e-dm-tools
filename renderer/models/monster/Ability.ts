import { LeanDocument, Schema, Types } from 'mongoose';

type Ability = {
  name: string;
  description: string;
};

export type AbilityDoc = LeanDocument<Ability> & {
  _id: Types.ObjectId;
};

export const AbilitySchema = new Schema<Ability>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
});

export default Ability;
