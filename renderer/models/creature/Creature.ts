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
  size: CreatureSize;
  type: CreatureType;
  alignment: Alignment;

  armourClass: number;
  hitPoints: number;
  hitDie: string;

  landSpeed: number;
  flySpeed: number;
  burrowSpeed: number;
  climbSpeed: number;
  hoverSpeed: number;

  blindsight: number;
  darkvision: number;
  tremorsense: number;
  truesight: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  profBonus: number;

  challengeRating: number;
  rewardXP: number;

  proficiencies: Proficiency[];
  savingThrows: Attribute[];
  immunities: DamageType[];
  condImmunities: ConditionType[];
  resistances: DamageType[];
  weaknesses: DamageType[];
  languages: Language[];

  abilities: Ability[];
  actions: Action[];

  isLegendary: boolean;
  hasLair: boolean;
};

export default Creature;
