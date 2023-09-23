use crate::dto::proficiency_dto::ProficiencyDto;

#[tauri::command]
pub fn get_all_proficiencies() -> Result<Vec<ProficiencyDto>, String> {
    println!("[server] Getting all proficiencies");
    let proficiencies = ProficiencyDto::get_all();

    println!("[server] Retrieved {} proficiencies", proficiencies.len());

    Ok(proficiencies)
}
