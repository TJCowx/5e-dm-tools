use crate::dto::spell::magic_school_dto::MagicSchoolDto;

#[tauri::command]
pub fn get_all_magic_schools() -> Result<Vec<MagicSchoolDto>, String> {
    println!("[server] Getting all magic schools");

    match MagicSchoolDto::get_all() {
        Ok(magic_schools) => {
            println!("[server] Retrieved {} magic schools", magic_schools.len());
            Ok(magic_schools)
        }
        Err(e) => {
            println!("[server] Failed to retrieve magic schools: {}", e);
            Err(e.to_string())
        }
    }
}
