export const AllConditionTypes = [
  'Blinded',
  'Charmed',
  'Deafened',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralyzed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconscious',
];

export const ConditionTypeSelectOptions = AllConditionTypes.map((ct) => ({
  value: ct,
  text: ct,
}));

type ConditionType = {
  id: number;
  name: string;
};

export default ConditionType;
