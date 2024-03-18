use crate::{
    dto::creature::creature_dto::CreatureDto,
    models::import_export::import_export_creature::ImportExportCreature,
};

#[tauri::command]
pub fn export_creature(id: i32) -> Result<ImportExportCreature, String> {
    println!("[server][export_query] Exporting creature {}", id);

    match CreatureDto::get_export_by_id(id) {
        Ok(creature) => {
            println!("[server][export_query] Creature exported succesfully!");
            Ok(creature)
        }
        Err(e) => {
            eprintln!("[server][export_query] Error: {}", e);
            Err(e)
        }
    }
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
