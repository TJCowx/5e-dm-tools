import mongoose, { Model, model, Schema } from 'mongoose';

export interface IMonster {
  id: string;
  name: string;
}

export const MonsterSchema = new Schema<IMonster>({
  name: { type: String, required: [true, 'Name is requied'] },
});

export default (mongoose.models.Monster as Model<IMonster>) ||
  model<IMonster>('Monster', MonsterSchema);
