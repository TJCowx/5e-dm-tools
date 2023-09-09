import Ability from './Ability';
import Action from './Action';
import Alignment from './Alignment';
import Attribute from './Attribute';
import ConditionType from './ConditionType';
import CreatureSize from './CreatureSize';
import CreatureType from './CreatureType';
import DamageType from './DamageType';
import Language from './Language';
import Proficiency from './Proficiency';

type Creature = {
  id: string;
  name: string;
  description?: string;
  armourClass: number;
  hitPoints: number;
  hitDie: string;

  landSpeed?: number;
  flySpeed?: number;
  burrowSpeed?: number;
  climbSpeed?: number;
  hoverSpeed?: number;

  blindsight?: number;
  darkvision?: number;
  tremorsense?: number;
  truesight?: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  profBonus: number;

  challengeRating: number;
  rewardXp: number;
  isLegendary: boolean;
  hasLair: boolean;

  alignmentId: number;
  creatureTypeId: number;
  sizeId: number;

  // I'm going to end up redesigning and rewriting the FE so this is fine for now despite be hating this
  languageIds?: number[];
  proficiencyIds?: number[];
  savingThrowIds?: number[];
  immunityIds?: number[];
  condImmunityIds?: number[];
  resistanceIds?: number[];
  weaknessIds?: number[];

  creatureType: CreatureType;
  alignment: Alignment;
  size?: CreatureSize;
  proficiencies?: Proficiency[];
  savingThrows?: Attribute[];
  immunities?: DamageType[];
  condImmunities?: ConditionType[];
  resistances?: DamageType[];
  weaknesses?: DamageType[];
  languages?: Language[];

  abilities?: Ability[];
  actions?: Action[];
};

export default Creature;
