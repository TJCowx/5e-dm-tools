use log::info;

use crate::dto::alignment_dto::AlignmentDto;

#[tauri::command]
pub fn get_all_alignments() -> Result<Vec<AlignmentDto>, String> {
    info!("Getting all alignments");
    let alignments = AlignmentDto::get_all();

    info!("Retrieved {} alignments", alignments.len());

    Ok(alignments)
}
