use crate::dto::size_dto::SizeDto;

#[tauri::command]
pub fn get_all_sizes() -> Result<Vec<SizeDto>, String> {
    println!("[server] Getting all sizes");
    let sizes = SizeDto::get_all();

    println!("[server] Retrieved {} sizes", sizes.len());

    Ok(sizes)
}
