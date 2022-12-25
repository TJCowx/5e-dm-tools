import mongoose, { Model, model, Schema } from 'mongoose';
import Ability from './Ability';
import Alignment from './Alignment';
import Attribute from './Attribute';
import ConditionType from './ConditionType';
import DamageType from './DamageType';
import Language from './Language';
import MonsterSize from './MonsterSize';
import MonsterType from './MonsterType';
import Proficiency from './Proficiency';

export type MonsterModel = {
  id: string;
  name: string;
  size: MonsterSize;
  type: MonsterType;
  alignment: Alignment;

  armourClass: number;
  hitPoints: number;
  hitDie: string;

  landSpeed: number;
  flySpeed: number;
  burrowSpeed: number;
  climbSpeed: number;
  hoverSpeed: number;

  blindsight: number;
  darkvision: number;
  tremorsense: number;
  truesight: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  profBonus: number;

  challengeRating: number;
  rewardXP: number;

  proficiencies: Proficiency[];
  savingThrows: Attribute[];
  immunities: DamageType[];
  condImmunities: ConditionType[];
  resistances: DamageType[];
  weaknesses: DamageType[];
  languages: Language[];

  abilities: Ability[];
  actions: any[]; // TODO: Array of actions

  isLegendary: boolean;
  hasLair: boolean;
};

export const MonsterSchema = new Schema<MonsterModel>({
  name: { type: String, required: [true, 'Name is requied'] },
});

export default (mongoose.models.Monster as Model<MonsterModel>) ||
  model<MonsterModel>('Monster', MonsterSchema);
