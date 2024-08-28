import Class from '@models/Class';
import MagicSchool from './MagicSchool';

type NewSpell = {
  name: string;
  description: string;
  higherLevels?: string;
  spellSlot: number;
  requiresVerbal: boolean;
  requiresSomatic: boolean;
  requiresMaterial: boolean;
  materialComponents?: string;
  level: number;
  castingTime: string;
  canRitualCast: boolean;
  rangeTypeId?: number;
  range?: number;
  castTypeId?: number;
  castTime: number;
  aoeTypeId?: number;
  aoeSize?: number;
  durationTypeId?: number;
  timeScaleId?: number;
  duration?: number;
  sourceAbbr?: string;

  magicSchools?: number[];
  classes?: number[];
};

export default NewSpell;
