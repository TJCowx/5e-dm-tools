use log::{error, info};

use crate::dto::spell::time_scale_dto::TimeScaleDto;

#[tauri::command]
pub fn get_all_time_scales() -> Result<Vec<TimeScaleDto>, String> {
    info!("Getting all time scales");
    match TimeScaleDto::get_all() {
        Ok(time_scales) => {
            info!("Retrieved {} time scales", time_scales.len());
            Ok(time_scales)
        }
        Err(e) => {
            error!("Failed to retrieve time scales: {}", e);
            Err(e.to_string())
        }
    }
}
