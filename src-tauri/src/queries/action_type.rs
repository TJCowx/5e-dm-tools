use log::info;

use crate::dto::action_type_dto::ActionTypeDto;

#[tauri::command]
pub fn get_all_action_types(
    has_legendary: bool,
    has_lair: bool,
) -> Result<Vec<ActionTypeDto>, String> {
    info!("Getting all action types");
    let action_types = ActionTypeDto::get_all(has_legendary, has_lair);

    info!("Retrieved {} action types", action_types.len());

    Ok(action_types)
}

#[tauri::command]
pub fn get_action_type_by_id(id: i32) -> Result<ActionTypeDto, String> {
    println!("Getting action type with id {}", id);
    let action_type = ActionTypeDto::get_by_id(id);

    info!("Retrieved action type with id {}", id);

    Ok(action_type)
}
