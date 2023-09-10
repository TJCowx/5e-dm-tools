use crate::dto::creature::creature_type::CreatureType;

#[tauri::command]
pub fn get_all_creature_types() -> Result<Vec<CreatureType>, String> {
    println!("[server] Getting all creature types");
    let creature_types = CreatureType::get_all();

    println!("[server] Retrieved {} creature types", creature_types.len());

    Ok(creature_types)
}
