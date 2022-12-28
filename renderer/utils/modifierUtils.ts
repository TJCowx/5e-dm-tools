import { MonsterModel } from 'models/monster/Monster';
import Proficiency from 'models/monster/Proficiency';

export const getModifier = (value: number) => Math.floor((value - 10) / 2);

export const getFormattedModifier = (value: number, profBonus = 0) => {
  const modifier = getModifier(value) + profBonus;

  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
};

export const getSkillAttribute = (prof: Proficiency, monster: MonsterModel) => {
  const { strength, dexterity, intelligence, wisdom, charisma } = monster;

  switch (prof) {
    case 'Athletics':
      return strength;
    case 'Acrobatics':
    case 'Sleight of Hand':
    case 'Stealth':
      return dexterity;
    case 'Arcana':
    case 'History':
    case 'Investigation':
    case 'Nature':
    case 'Religion':
      return intelligence;
    case 'Animal Handling':
    case 'Insight':
    case 'Medicine':
    case 'Perception':
    case 'Survival':
      return wisdom;
    case 'Deception':
    case 'Intimidation':
    case 'Performance':
    case 'Persuasion':
      return charisma;
    default:
      return 0;
  }
};
