export const AllCreatureSizes = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
] as const;

export const CreatureSizeSelectOptions = AllCreatureSizes.map((size) => ({
  value: size,
  text: size,
}));

type CreatureSize = typeof AllCreatureSizes[number];

export default CreatureSize;
