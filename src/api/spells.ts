import MagicSchool from '@models/spell/MagicSchool';
import NewSpell from '@models/spell/NewSpell';
import { formatNullableNumStr } from '@utils/formattingUtils';

/**
 * Gets all magic schools
 * @returns A promise that returns all creatures
 */
export async function getAllMagicSchools() {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<MagicSchool[]>('get_all_creatures');
}

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
      magicSchoolIds: spell.magicSchools,
      classIds: spell.classes,
    },
  });
}
