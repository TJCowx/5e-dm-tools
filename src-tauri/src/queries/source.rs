use crate::{dto::source::source_dto::SourceDto, models::source::list_item::SourceListItem};
use log::{error, info};

#[tauri::command]
pub fn get_all_sources() -> Result<Vec<SourceDto>, ()> {
    info!("Getting all sources");

    let sources = SourceDto::get_all();

    info!("Returning {} source", sources.len());

    Ok(sources)
}

#[tauri::command]
pub fn get_sources_list() -> Result<Vec<SourceListItem>, ()> {
    info!("Getting sources list...");

    let sources = SourceDto::get_all();
    let list_items: Vec<SourceListItem> = sources
        .into_iter()
        .map(|s| SourceListItem::from(s))
        .collect();

    info!("Retrieved {} sources", list_items.len());

    Ok(list_items)
}

#[tauri::command]
pub fn add_source(new_source: SourceDto) -> Result<(), String> {
    info!("Checking if source exists...");

    match SourceDto::does_abbr_exist(&new_source.abbreviation) {
        true => {
            info!("Source already exists");
            Err(format!(
                "There is already a source with the abbreviation of {}",
                &new_source.abbreviation
            ))
        }
        false => {
            info!("Source doesn't exist, creating...");
            SourceDto::insert(new_source);

            println!("Successfully added new source!");

            Ok(())
        }
    }
}

#[tauri::command]
pub fn edit_source(source: SourceDto) -> Result<(), String> {
    println!("Updating source...");

    match SourceDto::update(source) {
        Ok(_) => {
            info!("Successfully updated the source!");
            Ok(())
        }
        Err(e) => {
            error!("Error updating the source! {}", e);
            Err("There was an error updating your source".to_string())
        }
    }
}

#[tauri::command]
pub fn remove_source(abbr: String) -> Result<(), String> {
    println!("Removing source {}", abbr);

    match SourceDto::delete(&abbr) {
        Ok(_) => {
            info!("Source {} successfully removed!", abbr);
            Ok(())
        }
        Err(e) => {
            error!("Error removing source... {}", e);
            Err("Error deleting the source".to_string())
        }
    }
}
