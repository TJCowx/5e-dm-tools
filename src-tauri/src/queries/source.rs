use crate::{dto::source::source_dto::SourceDto, models::source::list_item::SourceListItem};

#[tauri::command]
pub fn get_all_sources() -> Result<Vec<SourceDto>, ()> {
    println!("[source] Getting all sources");

    let sources = SourceDto::get_all();

    println!("[source] Returning {} source", sources.len());

    Ok(sources)
}

#[tauri::command]
pub fn get_sources_list() -> Result<Vec<SourceListItem>, ()> {
    println!("[server] Getting sources list...");

    let sources = SourceDto::get_all();
    let list_items: Vec<SourceListItem> = sources
        .into_iter()
        .map(|s| SourceListItem::from(s))
        .collect();

    println!("[server] Retrieved {} sources", list_items.len());

    Ok(list_items)
}

#[tauri::command]
pub fn add_source(new_source: SourceDto) -> Result<(), String> {
    println!("[server] Checking if source exists...");

    match SourceDto::does_abbr_exist(&new_source.abbreviation) {
        true => {
            println!("[server] Source already exists");
            Err(format!(
                "There is already a source with the abbreviation of {}",
                &new_source.abbreviation
            ))
        }
        false => {
            println!("[server] Source doesn't exist, creating...");
            SourceDto::insert(new_source);

            println!("[server] Successfully added new source!");

            Ok(())
        }
    }
}

#[tauri::command]
pub fn edit_source(source: SourceDto) -> Result<(), String> {
    println!("[server] Updating source...");

    match SourceDto::update(source) {
        Ok(_) => {
            println!("[server] Successfully updated the source!");
            Ok(())
        }
        Err(e) => {
            println!("[server] Error updating the source! {}", e);
            Err("There was an error updating your source".to_string())
        }
    }
}

#[tauri::command]
pub fn remove_source(abbr: String) -> Result<(), String> {
    println!("[server] Removing source {}", abbr);

    match SourceDto::delete(&abbr) {
        Ok(_) => {
            println!("[server] Source {} successfully removed!", abbr);
            Ok(())
        }
        Err(e) => {
            println!("[server] Error removing source... {}", e);
            Err("Error deleting the source".to_string())
        }
    }
}
