use crate::models::creature::Creature;

#[tauri::command]
pub fn get_all_creatures() -> Result<Vec<Creature>, String> {
    println!("[server] Getting all creatures");
    let creatures = Creature::get_all();

    println!("[server] Retrieved {} creatures", creatures.len());

    Ok(creatures)
}
