import { Schema } from 'mongoose';

export const AllProficiencies = [
  'Athletics',
  'Acrobatics',
  'Sleight of Hand',
  'Stealth',
  'Arcana',
  'History',
  'Investigation',
  'Nature',
  'Religion',
  'Animal Handling',
  'Insight',
  'Medicine',
  'Perception',
  'Survival',
  'Deception',
  'Intimidation',
  'Performance',
  'Persuasion',
] as const;

export const ProficiencySelectOptions = AllProficiencies.map((prof) => ({
  value: prof,
  text: prof,
}));

type Proficiency = typeof AllProficiencies[number];

export default Proficiency;
