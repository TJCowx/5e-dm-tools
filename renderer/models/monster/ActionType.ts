export const AllActionTypes = [
  'Action',
  'Reaction',
  'Legendary',
  'Lair',
] as const;

type ActionType = typeof AllActionTypes[number];

export default ActionType;
