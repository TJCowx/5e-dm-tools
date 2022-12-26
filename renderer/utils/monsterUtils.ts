/* eslint-disable import/prefer-default-export */
import { MonsterModel } from 'models/monster/Monster';

/**
 * Converts any number fields from strings to ints.
 *
 * This is created due to MUI's number input emitting the value
 * as strings.
 *
 * @param monster The monster from the form
 * @returns the number fields parsed into numbers
 */
export const convertMonsterFormToDB = (monster: MonsterModel) => {
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
