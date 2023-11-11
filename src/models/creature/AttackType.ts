export type AttackDelivery = {
  id: number;
  name: string;
};
export type AttackType = {
  id: number;
  name: string;
};

export const AttackDeliverySelectOptions = [
  { value: 'Melee', text: 'Melee' },
  { value: 'Ranged', text: 'Ranged' },
];

export const AttackTypeSelectOptions = [
  { value: 'Weapon', text: 'Weapon' },
  { value: 'Spell', text: 'Spell' },
];
