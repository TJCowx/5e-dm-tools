use log::{error, info};

use crate::dto::spell::range_type_dto::RangeTypeDto;

#[tauri::command]
pub fn get_all_range_types() -> Result<Vec<RangeTypeDto>, String> {
    info!("Getting all range types");

    match RangeTypeDto::get_all() {
        Ok(range_types) => {
            info!("Retrieved {} range types", range_types.len());
            Ok(range_types)
        }
        Err(e) => {
            error!("Failed to retrieve magic_schools: {}", e);
            Err(e.to_string())
        }
    }
}
