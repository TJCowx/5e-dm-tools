use log::{error, info};

use crate::dto::spell::duration_type_dto::DurationTypeDto;

#[tauri::command]
pub fn get_all_duration_types() -> Result<Vec<DurationTypeDto>, String> {
    info!("Getting all duration types");
    match DurationTypeDto::get_all() {
        Ok(duration_types) => {
            info!("Retrieved {} duration types", duration_types.len());
            Ok(duration_types)
        }
        Err(e) => {
            error!("Failed to retrieve duration types: {}", e);
            Err(e.to_string())
        }
    }
}
