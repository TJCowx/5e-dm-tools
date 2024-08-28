import MagicSchool from '@models/spell/MagicSchool';
import NewSpell from '@models/spell/NewSpell';
import Spell from '@models/spell/Spell';
import { formatNullableNumStr } from '@utils/formattingUtils';

/**
 * Gets all magic schools
 * @returns A promise that returns all creatures
 */
export async function getAllMagicSchools() {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<MagicSchool[]>('get_all_creatures');
}

/**
 * Format all the spells and save it
 */
export async function addNewSpell(spell: NewSpell) {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke('add_spell', {
    newSpell: {
      ...spell,
      spellSlot: formatNullableNumStr(spell.spellSlot),
      level: formatNullableNumStr(spell.level),
      range: formatNullableNumStr(spell.range),
      rangeTypeId: formatNullableNumStr(spell.rangeTypeId),
      castTypeId: formatNullableNumStr(spell.castTypeId),
      castTime: formatNullableNumStr(spell.castTime),
      aoeTypeId: formatNullableNumStr(spell.aoeTypeId),
      aoeSize: formatNullableNumStr(spell.aoeSize),
      durationTypeId: formatNullableNumStr(spell.durationTypeId),
      duration: formatNullableNumStr(spell.duration),
      timeScaleId: formatNullableNumStr(spell.timeScaleId),
      magicSchoolId: formatNullableNumStr(spell.magicSchoolId),
      classIds: spell.classes,
    },
  });
}

/**
 * Loads all the spells
 * @returns A promise that returns all spells
 */
export async function getAllSpells(): Promise<Spell[]> {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<Spell[]>('get_all_spells');
}
