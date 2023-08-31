use crate::models::alignment::Alignment;

#[tauri::command]
pub fn get_all_alignments() -> Result<Vec<Alignment>, String> {
    println!("[server] Getting all alignments");
    let alignments = Alignment::get_all();

    println!("[server] Retrieved {} alignments", alignments.len());

    Ok(alignments)
}
