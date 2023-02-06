import Creature from 'models/creature/Creature';
import { Schema } from 'mongoose';
import AbilitySchema from './AbilitySchema';
import ActionSchema from './ActionSchema';

const CreatureSchema = new Schema<Creature>({
  name: { type: String, required: [true, 'Name is required'] },
  size: { type: String, required: [true, 'Size is required'] },
  type: { type: String, required: [true, 'Type is required'] },
  alignment: { type: String, required: [true, 'Alignment is required'] },
  armourClass: { type: Number, required: [true, 'Armour class is required'] },
  hitPoints: { type: Number, required: [true, 'Hit points is required'] },
  hitDie: { type: String, required: [true, 'Hit die is required'] },
  landSpeed: Number,
  flySpeed: Number,
  burrowSpeed: Number,
  climbSpeed: Number,
  hoverSpeed: Number,
  blindsight: Number,
  darkvision: Number,
  tremorsense: Number,
  truesight: Number,
  strength: {
    type: Number,
    required: [true, 'Strength is required'],
    min: [0, 'Strength must be greater than or equal to 0'],
    max: [30, 'Strength must be less than or equal to 30'],
  },
  dexterity: {
    type: Number,
    required: [true, 'Dexterity is required'],
    min: [0, 'Dexterity must be greater than or equal to 0'],
    max: [30, 'Dexterity must be less than or equal to 30'],
  },
  constitution: {
    type: Number,
    required: [true, 'Constitution is required'],
    min: [0, 'Constitution must be greater than or equal to 0'],
    max: [30, 'Constitution must be less than or equal to 30'],
  },
  intelligence: {
    type: Number,
    required: [true, 'Intelligence is required'],
    min: [0, 'Intelligence must be greater than or equal to 0'],
    max: [30, 'Intelligence must be less than or equal to 30'],
  },
  wisdom: {
    type: Number,
    required: [true, 'Wisdom is required'],
    min: [0, 'Wisdom must be greater than or equal to 0'],
    max: [30, 'Wisdom must be less than or equal to 30'],
  },
  charisma: {
    type: Number,
    required: [true, 'Charisma is required'],
    min: [0, 'Charisma must be greater than or equal to 0'],
    max: [30, 'Charisma must be less than or equal to 30'],
  },
  profBonus: {
    type: Number,
    required: [true, 'Proficiency bonus is required'],
    min: [0, 'Proficiency bonus must be greater than or equal to 0'],
  },
  challengeRating: {
    type: Number,
    required: [true, 'Challenge rating is required'],
    min: [0, 'Challenge rating must be greater than or equal to 0'],
  },
  rewardXP: {
    type: Number,
    required: [true, 'Reward XP is required'],
    min: [0, 'Reward XP must be greater than or equal to 0'],
  },
  proficiencies: [String],
  savingThrows: [String],
  immunities: [String],
  condImmunities: [String],
  resistances: [String],
  weaknesses: [String],
  languages: [String],
  abilities: [AbilitySchema],
  actions: [ActionSchema],
  isLegendary: Boolean,
  hasLair: Boolean,
});

export default CreatureSchema;
