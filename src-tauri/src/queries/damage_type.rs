use crate::dto::damage_type_dto::DamageTypeDto;
use log::{error, info};

#[tauri::command]
pub fn get_all_damage_types() -> Result<Vec<DamageTypeDto>, String> {
    info!("Getting all damage types");
    let damage_types = DamageTypeDto::get_all();

    info!("Retrieved {} damage types", damage_types.len());

    Ok(damage_types)
}

#[tauri::command]
pub fn get_damage_type_by_id(id: i32) -> Result<DamageTypeDto, String> {
    info!("Getting damage type with id {}", id);
    let damage_type = DamageTypeDto::get_by_id(id);

    info!("Retrieved damage type with id {}", id);

    Ok(damage_type)
}

#[tauri::command]
pub fn get_damage_types_by_ids(ids: Vec<i32>) -> Result<Vec<DamageTypeDto>, String> {
    info!("Getting damage types with ids {:?}", ids);

    match DamageTypeDto::get_by_ids(ids.clone()) {
        Ok(damage_types) => {
            info!(
                "Retrieved {} damage types with ids {:?}",
                damage_types.len(),
                ids
            );
            Ok(damage_types)
        }
        Err(e) => {
            error!("Failed to retrieve damage types with ids {:?}: {}", ids, e);
            Err(e.to_string())
        }
    }
}
