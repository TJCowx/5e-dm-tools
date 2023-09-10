use crate::dto::size::Size;

#[tauri::command]
pub fn get_all_sizes() -> Result<Vec<Size>, String> {
    println!("[server] Getting all sizes");
    let sizes = Size::get_all();

    println!("[server] Retrieved {} sizes", sizes.len());

    Ok(sizes)
}
