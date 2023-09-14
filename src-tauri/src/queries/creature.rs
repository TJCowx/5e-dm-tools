use crate::dto::creature::creature_dto::CreatureDto;
use crate::models::creature::Creature;
use crate::models::new_creature::NewCreature;

#[tauri::command]
pub fn get_all_creatures() -> Result<Vec<Creature>, String> {
    println!("[server] Getting all creatures");
    let creatures = CreatureDto::get_all();

    println!("[server] Retrieved {} creatures", creatures.len());

    Ok(creatures)
}

#[tauri::command]
pub fn add_creature(new_creature: NewCreature) -> Result<(), String> {
    println!("[server] Adding creature");

    match CreatureDto::insert_full_creature(new_creature) {
        Ok(_) => {
            println!("[server] Added creature");
            Ok(())
        }
        Err(e) => {
            println!("[server] Error adding creature: {}", e);
            Err("Error adding creature".to_string())
        }
    }
}

#[tauri::command]
pub fn get_creature_by_id(id: i32) -> Result<Creature, String> {
    println!("[server] Getting creature {}", id);

    // TODO:Not sure how well this pulls from the creature

    match CreatureDto::get_by_id(id) {
        Some(creature) => {
            println!("[server] Retrieved creature {}", id);
            Ok(creature)
        }
        None => {
            println!("[server] Error getting creature {}", id);
            Err("Error getting creature".to_string())
        }
    }
}

#[tauri::command]
pub fn update_creature(creature: Creature) -> Result<(), String> {
    println!("[server] Updating creature {}", creature.id);
    // TODO: This needs to actually save better
    match CreatureDto::update(creature) {
        Ok(_) => {
            println!("[server] Updated creature {}", creature.id);
            Ok(())
        }
        Err(e) => {
            println!("[server] Error updating creature: {}", e);
            Err("Error updating creature".to_string())
        }
    }
}

#[tauri::command]
pub fn delete_creature(id: i32) -> Result<(), String> {
    println!("[server] Deleting creature");

    match CreatureDto::delete(id) {
        Ok(_) => {
            println!("[server] Deleted creature {}", id);
            Ok(())
        }
        Err(e) => {
            println!("[server] Error deleting creature: {}", e);
            Err("Error deleting creature".to_string())
        }
    }
}
