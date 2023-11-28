import Creature from 'models/creature/Creature';
import { convertCreatureFormToDB } from 'utils/creatureUtils';

/**
 * Gets all the creatures
 * @returns A promise that returns all creatures
 */
export async function getAllCreatures() {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<Creature[]>('get_all_creatures');
}

/**
 * Gets a creature by their ID
 * @param creatureId The ID of the creature to get
 * @returns A promise the returns the creature
 */
export async function getCreatureById(creatureId: string) {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<Creature>('get_creature_by_id', { id: creatureId });
}

export async function addNewCreature(creature: Partial<Creature>) {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke('add_creature', {
    newCreature: convertCreatureFormToDB(creature),
  });
}

/**
 * Updates a creature with the new values
 * @param creature The updated creature value
 */
export async function updateCreature(creature: Partial<Creature>) {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke('update_creature', {
    creature: convertCreatureFormToDB(creature, true),
  });
}

/**
 * Deletes a creature by their id
 * @param creatureId The ID of the creature to delete
 */
export async function deleteCreature(creatureId: string) {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke('delete_creature', { id: creatureId });
}
