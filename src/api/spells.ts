import MagicSchool from '@models/spell/MagicSchool';

/**
 * Gets all magic schools
 * @returns A promise that returns all creatures
 */
export async function getAllMagicSchools() {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<MagicSchool[]>('get_all_creatures');
}
