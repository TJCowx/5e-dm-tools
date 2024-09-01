use log::{error, info};

use crate::{
    dto::spell::spell_dto::SpellDto,
    models::spell::{editable_spell::EditableSpell, new_spell::NewSpell, spell::Spell},
};

#[tauri::command]
pub fn get_all_spells() -> Result<Vec<Spell>, String> {
    info!("Getting all spells");

    match SpellDto::get_all() {
        Ok(spells) => {
            info!("Succesfully found {} spells", spells.len());
            Ok(spells)
        }
        Err(e) => {
            error!("Error loading spells, {}", e);
            Err(e)
        }
    }
}

#[tauri::command]
pub fn add_spell(new_spell: NewSpell) -> Result<(), String> {
    info!("Adding a new spell!");
    match SpellDto::insert_full_spell(new_spell) {
        Ok(_) => Ok(()),
        Err(e) => {
            error!("Error adding a new spell: {}", e);
            Err("There was an error adding the spell".to_string())
        }
    }
}

#[tauri::command]
pub fn get_editable_spell_by_id(id: i32) -> Result<EditableSpell, String> {
    info!("Getting editable spell {}", id);

    match SpellDto::get_editable_by_id(id) {
        Ok(spell) => {
            info!("Retrieved editable spell {}", id);
            Ok(spell)
        }
        Err(_) => {
            info!("Error getting editable spell {}", id);
            Err("Error getting editable spell".to_string())
        }
    }
}

#[tauri::command]
pub fn delete_spell(id: i32) -> Result<(), String> {
    info!("Deleting spell {}", id);
    match SpellDto::delete(&id) {
        Ok(_) => Ok(()),
        Err(e) => {
            error!("Error deleting spell {}: {}", id, e);
            Err("There was an error deleting the spell".to_string())
        }
    }
}
