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
pub fn delete_creature(id: i32) -> Result<(), String> {
    println!("[server] Deleting creature");

    match CreatureDto::delete(id) {
        Ok(_) => {
            println!("[server] Deleted creature");
            Ok(())
        }
        Err(e) => {
            println!("[server] Error deleting creature: {}", e);
            Err("Error deleting creature".to_string())
        }
    }
}
