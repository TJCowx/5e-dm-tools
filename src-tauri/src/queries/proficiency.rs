use crate::dto::proficiency::Proficiencies;

#[tauri::command]
pub fn get_all_proficiencies() -> Result<Vec<Proficiencies>, String> {
    println!("[server] Getting all proficiencies");
    let proficiencies = Proficiencies::get_all();

    println!("[server] Retrieved {} proficiencies", proficiencies.len());

    Ok(proficiencies)
}
