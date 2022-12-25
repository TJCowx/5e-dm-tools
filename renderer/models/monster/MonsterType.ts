export const AllMonsterTypes = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
] as const;

export const MonsterTypeSelectOptions = AllMonsterTypes.map((type) => ({
  value: type,
  text: type,
}));

type MonsterType = typeof AllMonsterTypes[number];

export default MonsterType;
