import Creature from 'models/creature/Creature';

import { getFormattedModifier, getSkillAttribute } from './modifierUtils';

/**
 * Converts any number fields from strings to ints.
 *
 * This is created due to MUI's number input emitting the value
 * as strings.
 *
 * TODO: this isEdit is a hack and bad
 *
 * @param creature The creature from the form
 * @returns the number fields parsed into numbers
 */
export const convertCreatureFormToDB = (
  creature: Partial<Creature>,
  isEdit = false,
) => {
  const {
    armourClass,
    hitPoints,
    landSpeed,
    flySpeed,
    burrowSpeed,
    climbSpeed,
    hoverSpeed,
    swimSpeed,
    blindsight,
    darkvision,
    tremorsense,
    truesight,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    profBonus,
    challengeRating,
    rewardXp,
    actions,
  } = creature;

  return {
    ...creature,
    armourClass: +(armourClass ?? 0),
    hitPoints: +(hitPoints ?? 0),
    landSpeed: landSpeed != null ? +(landSpeed ?? 0) : null,
    flySpeed: flySpeed != null ? +(flySpeed ?? 0) : null,
    burrowSpeed: burrowSpeed != null ? +(burrowSpeed ?? 0) : null,
    climbSpeed: climbSpeed != null ? +(climbSpeed ?? 0) : null,
    hoverSpeed: hoverSpeed != null ? +(hoverSpeed ?? 0) : null,
    swimSpeed: swimSpeed != null ? +(swimSpeed ?? 0) : null,
    blindsight: blindsight != null ? +(blindsight ?? 0) : null,
    darkvision: darkvision != null ? +(darkvision ?? 0) : null,
    tremorsense: tremorsense != null ? +(tremorsense ?? 0) : null,
    truesight: truesight != null ? +(truesight ?? 0) : null,
    strength: +(strength ?? 0),
    dexterity: +(dexterity ?? 0),
    constitution: +(constitution ?? 0),
    intelligence: +(intelligence ?? 0),
    wisdom: +(wisdom ?? 0),
    charisma: +(charisma ?? 0),
    profBonus: +(profBonus ?? 0),
    challengeRating: +(challengeRating ?? 0),
    rewardXp: +(rewardXp ?? 0),
    savingThrows: isEdit
      ? creature.savingThrows
      : creature.savingThrows?.join(','),
    actions,
  };
};

/** Adds letter suffix to the combatant's name */
export const getCombatantName = (name: string, numPrevType: number) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return `${name} ${alphabet.charAt(numPrevType)}`;
};

/**
 * Generates a string of speeds.
 *
 * @param creature the creature with the speed stats
 * @returns the string that lists the speeds
 */
export const getSpeedString = (creature: Creature) => {
  const {
    landSpeed,
    flySpeed,
    burrowSpeed,
    climbSpeed,
    hoverSpeed,
    swimSpeed,
  } = creature;

  const speedItems: string[] = [];

  if (landSpeed) speedItems.push(`${landSpeed}ft`);
  if (flySpeed) speedItems.push(`fly ${flySpeed}ft`);
  if (burrowSpeed) speedItems.push(`burrow ${burrowSpeed}ft`);
  if (climbSpeed) speedItems.push(`climb ${climbSpeed}ft`);
  if (hoverSpeed) speedItems.push(`hover ${hoverSpeed}ft`);
  if (swimSpeed) speedItems.push(`swim ${swimSpeed}`);

  return speedItems.join(' | ');
};

export const getSavingThrowsString = (creature: Creature) => {
  const {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    savingThrows,
    profBonus,
  } = creature;

  const proficientSavingThrows: string[] = [];

  (savingThrows ?? []).forEach((savingThrow) => {
    switch (savingThrow) {
      case 'Strength':
        proficientSavingThrows.push(
          `Str ${getFormattedModifier(strength, profBonus)}`,
        );
        break;
      case 'Dexterity':
        proficientSavingThrows.push(
          `Dex ${getFormattedModifier(dexterity, profBonus)}`,
        );
        break;
      case 'Constitution':
        proficientSavingThrows.push(
          `Con ${getFormattedModifier(constitution, profBonus)}`,
        );
        break;
      case 'Intelligence':
        proficientSavingThrows.push(
          `Int ${getFormattedModifier(intelligence, profBonus)}`,
        );
        break;
      case 'Wisdom':
        proficientSavingThrows.push(
          `Wis ${getFormattedModifier(wisdom, profBonus)}`,
        );
        break;
      case 'Charisma':
        proficientSavingThrows.push(
          `Cha ${getFormattedModifier(charisma, profBonus)}`,
        );
        break;
      default:
    }
  });

  return proficientSavingThrows.join(' | ');
};

export const getProficienciesString = (creature: Creature) => {
  const { proficiencies, profBonus } = creature;

  return (proficiencies ?? [])
    .map(
      (prof) =>
        `${prof.name} ${getFormattedModifier(
          getSkillAttribute(prof, creature),
          profBonus,
        )}`,
    )
    .join(' | ');
};

export const getCRFormatted = (val: number) => {
  switch (val) {
    case 0.125:
      return '1/8';
    case 0.25:
      return '1/4';
    case 0.5:
      return '1/2';
    default:
      return `${val}`;
  }
};

export const getProfBonusByCR = (val: number) => {
  switch (val) {
    case 0:
    case 0.125:
    case 0.25:
    case 0.5:
    case 1:
    case 2:
    case 3:
    case 4:
      return 2;
    case 5:
    case 6:
    case 7:
    case 8:
      return 3;
    case 9:
    case 10:
    case 11:
    case 12:
      return 4;
    case 13:
    case 14:
    case 15:
    case 16:
      return 5;
    case 17:
    case 18:
    case 19:
    case 20:
      return 6;
    case 21:
    case 22:
    case 23:
    case 24:
      return 7;
    case 25:
    case 26:
    case 27:
    case 28:
      return 8;
    default:
      return 9;
  }
};
