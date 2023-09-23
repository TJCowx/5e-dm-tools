use crate::dto::action_type::ActionType;

#[tauri::command]
pub fn get_all_action_types(
    has_legendary: bool,
    has_lair: bool,
) -> Result<Vec<ActionType>, String> {
    println!("[server] Getting all action types");
    let action_types = ActionType::get_all(has_legendary, has_lair);

    println!("[server] Retrieved {} action types", action_types.len());

    Ok(action_types)
}

#[tauri::command]
pub fn get_action_type_by_id(id: i32) -> Result<ActionType, String> {
    println!("[server] Getting action type with id {}", id);
    let action_type = ActionType::get_by_id(id);

    println!("[server] Retrieved action type with id {}", id);

    Ok(action_type)
}
