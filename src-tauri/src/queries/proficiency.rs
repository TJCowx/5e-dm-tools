use crate::dto::proficiency_dto::ProficiencyDto;
use log::info;

#[tauri::command]
pub fn get_all_proficiencies() -> Result<Vec<ProficiencyDto>, String> {
    info!("Getting all proficiencies");
    let proficiencies = ProficiencyDto::get_all();

    info!("Retrieved {} proficiencies", proficiencies.len());

    Ok(proficiencies)
}
