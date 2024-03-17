#[tauri::command]
pub fn export_creature(id: i32) -> Result<(), String> {
    println!("[server][export_query] Exporting creature {}", id);

    Ok(())
}

#[tauri::command]
pub fn export_creatures(ids: Vec<i32>) -> Result<(), String> {
    println!("[server][export_query] Exporting creatures {:?}", ids);

    Ok(())
}

#[tauri::command]
pub fn export_source(abbr: String) -> Result<(), String> {
    println!("[server][export_quer] Exporting source {}", abbr);

    Ok(())
}
