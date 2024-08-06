use crate::dto::class::class_dto::ClassDto;

#[tauri::command]
pub fn get_all_classes() -> Result<Vec<ClassDto>, String> {
    println!("[server] Getting all classes");

    match ClassDto::get_all() {
        Ok(classes) => {
            println!("[server] Retrieved {} classes", classes.len());
            Ok(classes)
        }
        Err(e) => {
            println!("[server] Failed to retrieve classes: {}", e);
            Err(e.to_string())
        }
    }
}
