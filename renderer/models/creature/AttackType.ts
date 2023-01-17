export type AttackDelivery = 'Melee' | 'Ranged';
export type AttackType = 'Weapon' | 'Spell';

export const AttackDeliverySelectOptions = [
  { value: 'Melee', text: 'Melee' },
  { value: 'Ranged', text: 'Ranged' },
];

export const AttackTypeSelectOptions = [
  { value: 'Weapon', text: 'Weapon' },
  { value: 'Spell', text: 'Spell' },
];
