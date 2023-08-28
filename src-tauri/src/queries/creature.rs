use crate::models::creature::creature::{Creature, CreatureAssociations, NewCreature};

#[tauri::command]
pub fn get_all_creatures() -> Result<Vec<Creature>, String> {
    println!("[server] Getting all creatures");
    let creatures = Creature::get_all();

    println!("[server] Retrieved {} creatures", creatures.len());

    Ok(creatures)
}

#[tauri::command]
pub fn add_creature(
    new_creature: NewCreature,
    associations: CreatureAssociations,
) -> Result<(), String> {
    println!("[server] Adding creature");

    match Creature::insert_full_creature(new_creature, associations) {
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
