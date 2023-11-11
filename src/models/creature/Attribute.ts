export const AllAttributes = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
] as const;

export const AttributeSelectOptions = AllAttributes.map((att) => ({
  value: att,
  text: att,
}));

type Attribute = typeof AllAttributes[number];

export default Attribute;
