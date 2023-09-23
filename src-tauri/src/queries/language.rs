use crate::dto::language_dto::LanguageDto;

#[tauri::command]
pub fn get_all_languages() -> Result<Vec<LanguageDto>, String> {
    println!("[server] Getting all languages");
    let languages = LanguageDto::get_all();

    println!("[server] Retrieved {} languages", languages.len());

    Ok(languages)
}
