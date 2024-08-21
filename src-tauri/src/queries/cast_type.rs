use log::info;

use crate::dto::spell::cast_type_dto::CastTypeDto;

#[tauri::command]
pub fn get_all_cast_types() -> Result<Vec<CastTypeDto>, String> {
    info!("Getting all cast types");

    match CastTypeDto::get_all() {
        Ok(cast_types) => {
            info!("Retrieved {} cast types", cast_types.len());
            Ok(cast_types)
        }
        Err(e) => {
            info!("Failed to retrieve cast types: {}", e);
            Err(e.to_string())
        }
    }
}
