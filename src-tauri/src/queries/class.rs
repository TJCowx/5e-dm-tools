use log::{error, info};

use crate::dto::class::class_dto::ClassDto;

#[tauri::command]
pub fn get_all_classes() -> Result<Vec<ClassDto>, String> {
    info!("[server] Getting all classes");

    match ClassDto::get_all() {
        Ok(classes) => {
            info!("[server] Retrieved {} classes", classes.len());
            Ok(classes)
        }
        Err(e) => {
            error!("[server] Failed to retrieve classes: {}", e);
            Err(e.to_string())
        }
    }
}
