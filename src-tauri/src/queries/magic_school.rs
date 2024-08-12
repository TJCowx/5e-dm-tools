use crate::dto::spell::magic_school_dto::MagicSchoolDto;
use log::{error, info};

#[tauri::command]
pub fn get_all_magic_schools() -> Result<Vec<MagicSchoolDto>, String> {
    info!("Getting all magic schools");

    match MagicSchoolDto::get_all() {
        Ok(magic_schools) => {
            info!("Retrieved {} magic schools", magic_schools.len());
            Ok(magic_schools)
        }
        Err(e) => {
            error!("Failed to retrieve magic_schools: {}", e);
            Err(e.to_string())
        }
    }
}
