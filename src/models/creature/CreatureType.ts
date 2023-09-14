export const AllCreatureTypes = [
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

export const CreatureTypeSelectOptions = AllCreatureTypes.map((type) => ({
  value: type,
  text: type,
}));

type CreatureType = {
  id: number;
  name: string;
};

export default CreatureType;
