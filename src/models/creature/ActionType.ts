export const AllActionTypes = [
  'Action',
  'Reaction',
  'Legendary',
  'Lair',
] as const;

export const ActionTypeSelectOptions = AllActionTypes.map((type) => ({
  value: type,
  text: type,
}));

type ActionType = typeof AllActionTypes[number];

export default ActionType;
