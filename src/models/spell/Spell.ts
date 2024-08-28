import Class from '@models/Class';
import AoeType from './AoeType';
import CastType from './CastType';
import DurationType from './DurationType';
import MagicSchool from './MagicSchool';
import RangeType from './RangeType';
import TimeScale from './TimeScale';
import Source from '@models/source/Source';

type Spell = {
  id: number;
  name: string;
  description?: string;
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
  range?: number;
  castTypeId: number;
  castTime: number;
  aoeTypeId?: number;
  aoeSize?: number;
  durationTypeId: number;
  timeScaleId?: number;
  duration?: number;
  sourceAbbr?: string;

  rangeType?: RangeType;
  castType?: CastType;
  aoeType?: AoeType;
  durationType?: DurationType;
  timeScale?: TimeScale;
  magicSchools?: MagicSchool[];
  classes?: Class[];
  source?: Source;
};

export default Spell;
