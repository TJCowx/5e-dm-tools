use crate::dto::condition_type_dto::ConditionTypeDto;
use log::info;

#[tauri::command]
pub fn get_all_condition_types() -> Result<Vec<ConditionTypeDto>, String> {
    info!("Getting all condition types");
    let condition_types = ConditionTypeDto::get_all();

    info!("Retrieved {} condition types", condition_types.len());

    Ok(condition_types)
}
