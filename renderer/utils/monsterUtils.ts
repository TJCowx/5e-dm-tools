/* eslint-disable import/prefer-default-export */
import Ability, { AbilityDoc } from 'models/monster/Ability';
import Action, { ActionDoc } from 'models/monster/Action';
import ConditionType from 'models/monster/ConditionType';
import DamageType from 'models/monster/DamageType';
import { MonsterModel } from 'models/monster/Monster';
import Proficiency from 'models/monster/Proficiency';
import { LeanDocument, Types } from 'mongoose';
import { getFormattedModifier, getSkillAttribute } from './modifierUtils';

/**
 * Converts any number fields from strings to ints.
 *
 * This is created due to MUI's number input emitting the value
 * as strings.
 *
 * @param monster The monster from the form
 * @returns the number fields parsed into numbers
 */
export const convertMonsterFormToDB = (monster: Partial<MonsterModel>) => {
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
  } = monster;

  return {
    ...monster,
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
 * @param monster the monster with the speed stats
 * @returns the string that lists the speeds
 */
export const getSpeedString = (monster: MonsterModel) => {
  const { landSpeed, flySpeed, burrowSpeed, climbSpeed, hoverSpeed } = monster;

  const speedItems: string[] = [];

  if (landSpeed) speedItems.push(`${landSpeed}ft`);
  if (flySpeed) speedItems.push(`fly ${flySpeed}ft`);
  if (burrowSpeed) speedItems.push(`burrow ${burrowSpeed}ft`);
  if (climbSpeed) speedItems.push(`climb ${climbSpeed}ft`);
  if (hoverSpeed) speedItems.push(`hover ${hoverSpeed}ft`);

  return speedItems.join(' | ');
};

export const getSavingThrowsString = (monster: MonsterModel) => {
  const {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    savingThrows,
    profBonus,
  } = monster;

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

export const getProficienciesString = (monster: MonsterModel) => {
  const { proficiencies, profBonus } = monster;

  return proficiencies
    .map(
      (prof) =>
        `${prof} ${getFormattedModifier(
          getSkillAttribute(prof, monster),
          profBonus
        )}`
    )
    .join(' | ');
};

const mapAbilityDoc = (doc: AbilityDoc): Ability => {
  const { _id: id, ...ability } = doc;

  return ability;
};

const mapActionDoc = (doc: ActionDoc): Action => {
  const { _id: id, ...action } = doc;

  return action;
};

export const mapMonsterDoc = (
  doc: LeanDocument<MonsterModel> & {
    _id: Types.ObjectId;
  }
) => {
  const { _id: id, abilities, actions, ...restOfMonster } = doc;

  return {
    ...restOfMonster,
    id: id.toString(),
    abilities: abilities.map((ability) => mapAbilityDoc(ability as AbilityDoc)),
    actions: actions.map((action) => mapActionDoc(action as ActionDoc)),
  };
};
