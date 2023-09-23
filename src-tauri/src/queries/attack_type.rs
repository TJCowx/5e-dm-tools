use crate::dto::attack_type_dto::AttackTypeDto;

#[tauri::command]
pub fn get_all_attack_types() -> Result<Vec<AttackTypeDto>, String> {
    println!("[server] Getting all attack types");

    match AttackTypeDto::get_all() {
        Ok(attack_types) => {
            println!("[server] Retrieved {} attack types", attack_types.len());
            Ok(attack_types)
        }
        Err(e) => {
            println!("[server] Failed to retrieve attack types: {}", e);
            Err(e.to_string())
        }
    }
}

#[tauri::command]
pub fn get_attack_type_by_id(id: i32) -> Result<AttackTypeDto, String> {
    println!("[server] Getting attack type with id {}", id);

    match AttackTypeDto::get_by_id(id) {
        Ok(attack_type) => {
            println!("[server] Retrieved attack type with id {}", id);
            Ok(attack_type)
        }
        Err(e) => {
            println!(
                "[server] Failed to retrieve attack type with id {}: {}",
                id, e
            );
            Err(e.to_string())
        }
    }
}
