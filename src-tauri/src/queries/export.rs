use crate::{
    dto::creature::creature_dto::CreatureDto,
    models::import_export::import_export_creature::ImportExportCreature,
};
use log::{error, info, warn};

#[tauri::command]
pub fn export_creature(id: i32) -> Result<ImportExportCreature, String> {
    info!("Exporting creature {}", id);

    match CreatureDto::get_export_by_id(id) {
        Ok(creature) => {
            info!("Creature exported succesfully!");
            Ok(creature)
        }
        Err(e) => {
            error!("Error: {}", e);
            Err(e)
        }
    }
}

#[tauri::command]
pub fn export_creatures(ids: Vec<i32>) -> Result<(), String> {
    info!("Exporting creatures {:?}", ids);
    warn!("This feature is not implemented!!!");

    Ok(())
}

#[tauri::command]
pub fn export_source(abbr: String) -> Result<(), String> {
    info!("Exporting source {}", abbr);
    warn("This feature is not implemented");

    Ok(())
}
