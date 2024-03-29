import Environment from '@models/Environment';
import Source from '@models/source/Source';

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

type BaseCreature = {
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
  sourceAbbr?: string | null;

  abilities: Partial<Ability>[];
  actions: Partial<Action>[];
  source?: Source | null;
};

type Creature = BaseCreature & {
  id: string;

  creatureType: CreatureType;
  alignment: Alignment;
  size: CreatureSize;
  source?: Source;
  proficiencies?: Proficiency[];
  savingThrows?: Attribute[];
  immunities?: DamageType[];
  condImmunities?: ConditionType[];
  resistances?: DamageType[];
  weaknesses?: DamageType[];
  languages?: Language[];
  environments?: Environment[];

  abilities?: Ability[];
  actions?: Action[];
};

export default Creature;
