use crate::dto::size_dto::SizeDto;
use log::info;

#[tauri::command]
pub fn get_all_sizes() -> Result<Vec<SizeDto>, String> {
    info!("Getting all sizes");
    let sizes = SizeDto::get_all();

    info!("Retrieved {} sizes", sizes.len());

    Ok(sizes)
}
