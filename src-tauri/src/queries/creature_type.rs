use crate::dto::creature::creature_type_dto::CreatureTypeDto;
use log::info;

#[tauri::command]
pub fn get_all_creature_types() -> Result<Vec<CreatureTypeDto>, String> {
    info!("Getting all creature types");
    let creature_types = CreatureTypeDto::get_all();

    info!("Retrieved {} creature types", creature_types.len());

    Ok(creature_types)
}
