use crate::dto::creature::creature_type_dto::CreatureTypeDto;

#[tauri::command]
pub fn get_all_creature_types() -> Result<Vec<CreatureTypeDto>, String> {
    println!("[server] Getting all creature types");
    let creature_types = CreatureTypeDto::get_all();

    println!("[server] Retrieved {} creature types", creature_types.len());

    Ok(creature_types)
}
