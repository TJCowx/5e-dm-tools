export const AllAlignments = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
  'Unaligned',
] as const;

export const AlignmentSelectOptions = AllAlignments.map((alignment) => ({
  value: alignment,
  text: alignment,
}));

type Alignment = typeof AllAlignments[number];

export default Alignment;
