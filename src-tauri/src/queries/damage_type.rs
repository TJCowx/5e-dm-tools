use crate::dto::damage_type::DamageType;

#[tauri::command]
pub fn get_all_damage_types() -> Result<Vec<DamageType>, String> {
    println!("[server] Getting all damage types");
    let damage_types = DamageType::get_all();

    println!("[server] Retrieved {} damage types", damage_types.len());

    Ok(damage_types)
}

#[tauri::command]
pub fn get_damage_type_by_id(id: i32) -> Result<DamageType, String> {
    println!("[server] Getting damage type with id {}", id);
    let damage_type = DamageType::get_by_id(id);

    println!("[server] Retrieved damage type with id {}", id);

    Ok(damage_type)
}

#[tauri::command]
pub fn get_damage_types_by_ids(ids: Vec<i32>) -> Result<Vec<DamageType>, String> {
    println!("[server] Getting damage types with ids {:?}", ids);

    match DamageType::get_by_ids(ids.clone()) {
        Ok(damage_types) => {
            println!(
                "[server] Retrieved {} damage types with ids {:?}",
                damage_types.len(),
                ids
            );
            Ok(damage_types)
        }
        Err(e) => {
            println!(
                "[server] Failed to retrieve damage types with ids {:?}: {}",
                ids, e
            );
            Err(e.to_string())
        }
    }
}
