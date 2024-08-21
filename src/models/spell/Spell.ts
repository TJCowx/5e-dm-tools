import Class from '@models/Class';
import AoeType from './AoeType';
import CastType from './CastType';
import DurationType from './DurationType';
import MagicSchool from './MagicSchool';
import RangeType from './RangeType';
import SpellDamage from './SpellDamage';
import TimeScale from './TimeScale';

type Spell = {
  id: number;
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
  rangeTypeId: number;
  range?: string;
  castTypeId: number;
  castTime: number;
  aoeTypeId?: number;
  aoeSize?: number;
  durationTypeId: number;
  timeScaleId?: number;
  duration?: number;
  hitCount: number;

  rangeType?: RangeType;
  castType?: CastType;
  aoeType?: AoeType;
  durationType?: DurationType;
  timeScale?: TimeScale;
  damages?: SpellDamage[];
  magicSchools?: MagicSchool[];
  classes?: Class[];
};

export default Spell;
