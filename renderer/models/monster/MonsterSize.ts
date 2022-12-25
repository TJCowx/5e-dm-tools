export const AllMonsterSizes = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
] as const;

export const MonsterSizeSelectOptions = AllMonsterSizes.map((size) => ({
  value: size,
  text: size,
}));

type MonsterSize = typeof AllMonsterSizes[number];

export default MonsterSize;
