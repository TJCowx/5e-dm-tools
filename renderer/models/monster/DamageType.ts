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

export const DamageTypeSelectOptions = AllDamageTypes.map((dt) => ({
  value: dt,
  text: dt,
}));

type DamageType = typeof AllDamageTypes[number];

export default DamageType;
