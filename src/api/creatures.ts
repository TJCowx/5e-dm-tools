import { invoke } from '@tauri-apps/api/tauri';
import Creature from 'models/creature/Creature';
import { convertCreatureFormToDB } from 'utils/creatureUtils';

/**
 * Gets all the creatures
 * @returns A promise that returns all creatures
 */
export function getAllCreatures() {
  return invoke<Creature[]>('get_all_creatures');
}

/**
 * Gets a creature by their ID
 * @param creatureId The ID of the creature to get
 * @returns A promise the returns the creature
 */
export function getCreatureById(creatureId: string) {
  return invoke<Creature>('get_creature_by_id', { id: creatureId });
}

/**
 * Updates a creature with the new values
 * @param creature The updated creature value
 */
export function updateCreature(creature: Partial<Creature>) {
  return invoke('update_creature', {
    creature: convertCreatureFormToDB(creature),
  });
}

/**
 * Deletes a creature by their id
 * @param creatureId The ID of the creature to delete
 */
export function deleteCreature(creatureId: string) {
  return invoke('delete_creature', { id: creatureId });
}
