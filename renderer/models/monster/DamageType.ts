export const AllDamageTypes = [
  'Acid',
  'Cold',
  'Fire',
  'Force',
  'Lightning',
  'Necrotic',
  'Poison',
  'Psychic',
  'Radiant',
  'Thunder',
  'Non-Magical',
  'Magic Weapons',
  'Bludgeoning',
  'Slashing',
  'Piercing',
] as const;

type DamageType = typeof AllDamageTypes[number];

export default DamageType;
