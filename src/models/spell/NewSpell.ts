import Class from '@models/Class';
import SpellDamage from './SpellDamage';

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
  range?: string;
  castTypeId?: number;
  castTime: number;
  aoeTypeId?: number;
  aoeSize?: number;
  durationTypeId?: number;
  timeScaleId?: number;
  duration?: number;
  hitCount: number;

  damages?: SpellDamage[];
  classes?: Class[];
};

export default NewSpell;
