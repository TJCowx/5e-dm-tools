export const AllLanguages = [
  'Dwarvish',
  'Common',
  'Elvish',
  'Giant',
  'Gnomish',
  'Goblin',
  'Halfling',
  'Orc',
  'Abyssal',
  'Celestial',
  'Draconic',
  'Deep Speech',
  'Infernal',
  'Primordial',
  'Sylvan',
  'Undercommon',
] as const;

export const LanguageSelectOptions = AllLanguages.map((lang) => ({
  value: lang,
  text: lang,
}));

type Language = typeof AllLanguages[number];

export default Language;
