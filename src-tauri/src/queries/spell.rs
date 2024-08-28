use log::{error, info};

use crate::{
    dto::spell::spell_dto::SpellDto,
    models::spell::{new_spell::NewSpell, spell::Spell},
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
