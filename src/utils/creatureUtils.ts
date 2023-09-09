/* eslint-disable import/prefer-default-export */
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
    rewardXp,
    actions,
  } = creature;

  return {
    newCreature: {
      ...creature,
      armourClass: +(armourClass ?? 0),
      hitPoints: +(hitPoints ?? 0),
      landSpeed: landSpeed != null ? +(landSpeed ?? 0) : null,
      flySpeed: flySpeed != null ? +(flySpeed ?? 0) : null,
      burrowSpeed: burrowSpeed != null ? +(burrowSpeed ?? 0) : null,
      climbSpeed: climbSpeed != null ? +(climbSpeed ?? 0) : null,
      hoverSpeed: hoverSpeed != null ? +(hoverSpeed ?? 0) : null,
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
      savingThrows: creature.savingThrows?.join(','),
    },
    associations: {
      proficiencies: creature.proficiencyIds,
      immunities: creature.immunityIds,
      condImmunities: creature.condImmunityIds,
      resistances: creature.resistanceIds,
      weaknesses: creature.weaknessIds,
      languages: creature.languageIds,
      abilities: [],
      actions: [],
    },
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

  (savingThrows ?? []).forEach((savingThrow) => {
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

  return (proficiencies ?? [])
    .map(
      (prof) =>
        `${prof} ${getFormattedModifier(
          getSkillAttribute(prof, creature),
          profBonus
        )}`
    )
    .join(' | ');
};
