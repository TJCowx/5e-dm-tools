use crate::models::import_export::{
    import_export_creature::ImportExportCreature, import_export_source::ImportExportSource,
};

#[tauri::command]
pub fn import_creature(creature: ImportExportCreature) -> Result<(), String> {
    println!("[server][import_query] Importing a new creature");

    Ok(())
}

#[tauri::command]
pub fn import_creatures(creatures: Vec<ImportExportCreature>) -> Result<(), String> {
    println!(
        "[server][import_query] Importing {} creatures",
        creatures.len()
    );

    Ok(())
}

#[tauri::command]
pub fn import_source(source: ImportExportSource) -> Result<(), String> {
    println!("[server][import_query] Importing source {}", source.name);

    Ok(())
}
