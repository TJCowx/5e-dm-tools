use crate::dto::condition_type_dto::ConditionTypeDto;

#[tauri::command]
pub fn get_all_condition_types() -> Result<Vec<ConditionTypeDto>, String> {
    println!("[server] Getting all condition types");
    let condition_types = ConditionTypeDto::get_all();

    println!(
        "[server] Retrieved {} condition types",
        condition_types.len()
    );

    Ok(condition_types)
}
