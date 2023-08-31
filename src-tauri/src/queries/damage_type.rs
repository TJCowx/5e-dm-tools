use crate::models::damage_type::DamageType;

#[tauri::command]
pub fn get_all_damage_types() -> Result<Vec<DamageType>, String> {
    println!("[server] Getting all condition types");
    let condition_types = DamageType::get_all();

    println!(
        "[server] Retrieved {} condition types",
        condition_types.len()
    );

    Ok(condition_types)
}
