export const AllAttributes = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
] as const;

type Attribute = typeof AllAttributes[number];

export default Attribute;
