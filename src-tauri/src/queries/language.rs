use crate::dto::language::Language;

#[tauri::command]
pub fn get_all_languages() -> Result<Vec<Language>, String> {
    println!("[server] Getting all languages");
    let languages = Language::get_all();

    println!("[server] Retrieved {} languages", languages.len());

    Ok(languages)
}
