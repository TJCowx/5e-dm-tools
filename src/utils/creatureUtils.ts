import Creature from 'models/creature/Creature';

import { getFormattedModifier, getSkillAttribute } from './modifierUtils';

/**
 * Converts any number fields from strings to ints.
 *
 * This is created due to MUI's number input emitting the value
 * as strings.
 *
 * @param creature The creature from the form
 * @returns the number fields parsed into numbers
 */
export const convertCreatureFormToDB = (creature: Partial<Creature>) => {
  const {
    armourClass,
    hitPoints,
    landSpeed,
    flySpeed,
    burrowSpeed,
    climbSpeed,
    hoverSpeed,
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
    rewardXP,
    actions,
  } = creature;

  return {
    ...creature,
    armourClass: parseInt(`${armourClass}`, 10),
    hitPoints: parseInt(`${hitPoints}`, 10),
    landSpeed: landSpeed != null ? parseInt(`${landSpeed}`, 10) : undefined,
    flySpeed: flySpeed != null ? parseInt(`${flySpeed}`, 10) : undefined,
    burrowSpeed:
      burrowSpeed != null ? parseInt(`${burrowSpeed}`, 10) : undefined,
    climbSpeed: climbSpeed != null ? parseInt(`${climbSpeed}`, 10) : undefined,
    hoverSpeed: hoverSpeed != null ? parseInt(`${hoverSpeed}`, 10) : undefined,
    blindsight: blindsight != null ? parseInt(`${blindsight}`, 10) : undefined,
    darkvision: darkvision != null ? parseInt(`${darkvision}`, 10) : undefined,
    tremorsense:
      tremorsense != null ? parseInt(`${tremorsense}`, 10) : undefined,
    truesight: truesight != null ? parseInt(`${truesight}`, 10) : undefined,
    strength: parseInt(`${strength}`, 10),
    dexterity: parseInt(`${dexterity}`, 10),
    constitution: parseInt(`${constitution}`, 10),
    intelligence: parseInt(`${intelligence}`, 10),
    wisdom: parseInt(`${wisdom}`, 10),
    charisma: parseInt(`${charisma}`, 10),
    profBonus: parseInt(`${profBonus}`, 10),
    challengeRating: parseInt(`${challengeRating}`, 10),
    rewardXP: parseInt(`${rewardXP}`, 10),
    actions: actions.map((act) => ({
      ...act,
      toHit: parseInt(`${act.toHit}`, 10),
      react: parseInt(`${act.reach}`, 10),
    })),
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
  const { landSpeed, flySpeed, burrowSpeed, climbSpeed, hoverSpeed } = creature;

  const speedItems: string[] = [];

  if (landSpeed) speedItems.push(`${landSpeed}ft`);
  if (flySpeed) speedItems.push(`fly ${flySpeed}ft`);
  if (burrowSpeed) speedItems.push(`burrow ${burrowSpeed}ft`);
  if (climbSpeed) speedItems.push(`climb ${climbSpeed}ft`);
  if (hoverSpeed) speedItems.push(`hover ${hoverSpeed}ft`);

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

  savingThrows.forEach((savingThrow) => {
    switch (savingThrow) {
      case 'Strength':
        proficientSavingThrows.push(
          `Str ${getFormattedModifier(strength, profBonus)}`
        );
        break;
      case 'Dexterity':
        proficientSavingThrows.push(
          `Dex ${getFormattedModifier(dexterity, profBonus)}`
        );
        break;
      case 'Constitution':
        proficientSavingThrows.push(
          `Con ${getFormattedModifier(constitution, profBonus)}`
        );
        break;
      case 'Intelligence':
        proficientSavingThrows.push(
          `Int ${getFormattedModifier(intelligence, profBonus)}`
        );
        break;
      case 'Wisdom':
        proficientSavingThrows.push(
          `Wis ${getFormattedModifier(wisdom, profBonus)}`
        );
        break;
      case 'Charisma':
        proficientSavingThrows.push(
          `Cha ${getFormattedModifier(charisma, profBonus)}`
        );
        break;
      default:
    }
  });

  return proficientSavingThrows.join(' | ');
};

export const getProficienciesString = (creature: Creature) => {
  const { proficiencies, profBonus } = creature;

  return proficiencies
    .map(
      (prof) =>
        `${prof} ${getFormattedModifier(
          getSkillAttribute(prof, creature),
          profBonus
        )}`
    )
    .join(' | ');
};
