use crate::models::action_type::ActionType;

#[tauri::command]
pub fn get_all_action_types() -> Result<Vec<ActionType>, String> {
    println!("[server] Getting all action types");
    let action_types = ActionType::get_all();

    println!("[server] Retrieved {} action types", action_types.len());

    Ok(action_types)
}
