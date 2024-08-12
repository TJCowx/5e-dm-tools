use crate::models::import_export::{
    import_export_creature::ImportExportCreature, import_export_source::ImportExportSource,
};
use log::{info, warn};

#[tauri::command]
pub fn import_creature(creature: ImportExportCreature) -> Result<(), String> {
    info!("Importing a new creature");
    warn!("This feature is not implemented!!!");

    Ok(())
}

#[tauri::command]
pub fn import_creatures(creatures: Vec<ImportExportCreature>) -> Result<(), String> {
    info!("Importing {} creatures", creatures.len());
    warn!("This feature is not implemented!!!");

    Ok(())
}

#[tauri::command]
pub fn import_source(source: ImportExportSource) -> Result<(), String> {
    info!("Importing source {}", source.name);
    warn!("This feature is not implemented!!!");

    Ok(())
}
