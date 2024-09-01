use log::{error, info};

use crate::dto::spell::aoe_type_dto::AoeTypeDto;

#[tauri::command]
pub fn get_all_aoe_types() -> Result<Vec<AoeTypeDto>, String> {
    info!("Getting all aoe types");
    match AoeTypeDto::get_all() {
        Ok(types) => {
            info!("Retrieved {} aoe types", types.len());
            Ok(types)
        }
        Err(e) => {
            error!("There was an error retrieving AOE types: {}", e);
            Err("There was an error retrieving AOE types".to_string())
        }
    }
}
