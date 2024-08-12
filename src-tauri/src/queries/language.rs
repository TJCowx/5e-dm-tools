use crate::dto::language_dto::LanguageDto;
use log::info;

#[tauri::command]
pub fn get_all_languages() -> Result<Vec<LanguageDto>, String> {
    info!("Getting all languages");
    let languages = LanguageDto::get_all();

    info!("Retrieved {} languages", languages.len());

    Ok(languages)
}
