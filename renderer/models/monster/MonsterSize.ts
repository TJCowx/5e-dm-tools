export const AllMonsterSizes = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
] as const;

type MonsterSize = typeof AllMonsterSizes[number];

export default MonsterSize;
