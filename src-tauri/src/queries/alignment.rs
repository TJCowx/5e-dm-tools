use crate::dto::alignment_dto::AlignmentDto;

#[tauri::command]
pub fn get_all_alignments() -> Result<Vec<AlignmentDto>, String> {
    println!("[server] Getting all alignments");
    let alignments = AlignmentDto::get_all();

    println!("[server] Retrieved {} alignments", alignments.len());

    Ok(alignments)
}
