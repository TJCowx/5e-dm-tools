use crate::dto::proficiency::Proficiency;

#[tauri::command]
pub fn get_all_proficiencies() -> Result<Vec<Proficiency>, String> {
    println!("[server] Getting all proficiencies");
    let proficiencies = Proficiency::get_all();

    println!("[server] Retrieved {} proficiencies", proficiencies.len());

    Ok(proficiencies)
}
