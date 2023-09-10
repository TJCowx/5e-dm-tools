use crate::dto::condition_type::ConditionType;

#[tauri::command]
pub fn get_all_condition_types() -> Result<Vec<ConditionType>, String> {
    println!("[server] Getting all condition types");
    let condition_types = ConditionType::get_all();

    println!(
        "[server] Retrieved {} condition types",
        condition_types.len()
    );

    Ok(condition_types)
}
