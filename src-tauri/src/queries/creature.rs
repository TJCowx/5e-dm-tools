use std::error::Error;

use log::{error, info, warn};

use crate::{
    dto::creature::creature_dto::CreatureDto,
    models::creature::{
        creature::Creature, editable_creature::EditableCreature, new_creature::NewCreature,
    },
};

#[tauri::command]
pub fn get_all_creatures() -> Result<Vec<Creature>, String> {
    info!("Getting all creatures");
    let creatures = CreatureDto::get_all();

    info!("Retrieved {} creatures", creatures.len());

    Ok(creatures)
}

#[tauri::command]
pub fn add_creature(new_creature: NewCreature) -> Result<(), String> {
    info!("Adding creature");

    match CreatureDto::insert_full_creature(new_creature) {
        Ok(_) => {
            info!("Added creature");
            Ok(())
        }
        Err(e) => {
            error!("Error adding creature: {}", e);
            error!("Trace: {:#?}", e.source());
            Err("Error adding creature".to_string())
        }
    }
}

#[tauri::command]
pub fn get_creature_by_id(id: i32) -> Result<Creature, String> {
    info!("Getting creature {}", id);

    match CreatureDto::get_by_id(id) {
        Ok(creature) => {
            info!("Retrieved creature {}", id);
            Ok(creature)
        }
        Err(_) => {
            error!("Error getting creature {}", id);
            Err("Error getting creature".to_string())
        }
    }
}

#[tauri::command]
pub fn get_editable_creature_by_id(id: i32) -> Result<EditableCreature, String> {
    info!("Getting editable creature {}", id);

    match CreatureDto::get_editable_by_id(id) {
        Ok(creature) => {
            info!("Retrieved editable creature {}", id);
            Ok(creature)
        }
        Err(_) => {
            info!("Error getting editable creature {}", id);
            Err("Error getting editable creature".to_string())
        }
    }
}

#[tauri::command]
pub fn update_creature(creature: EditableCreature) -> Result<(), String> {
    info!("Updating creature {}", creature.id);
    match CreatureDto::update(&creature) {
        Ok(_) => {
            info!("Updated creature {}", &creature.id);
            Ok(())
        }
        Err(e) => {
            error!("Error updating creature: {}", e);
            Err("Error updating creature".to_string())
        }
    }
}

#[tauri::command]
pub fn delete_creature(id: i32) -> Result<(), String> {
    info!("Deleting creature");

    match CreatureDto::delete(id) {
        Ok(_) => {
            info!("[server] Deleted creature {}", id);
            Ok(())
        }
        Err(e) => {
            error!("[server] Error deleting creature: {}", e);
            Err("Error deleting creature".to_string())
        }
    }
}
