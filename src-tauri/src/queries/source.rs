use crate::{dto::source::source_dto::SourceDto, models::source::list_item::SourceListItem};

#[tauri::command]
pub fn get_all_sources() -> Result<Vec<SourceDto>, String> {
    Ok(vec![])
}

#[tauri::command]
pub fn get_sources_list() -> Result<Vec<SourceListItem>, ()> {
    println!("[server] Getting sources list...");

    let sources = SourceDto::get_all();
    let list_items = sources
        .into_iter()
        .map(|s| SourceListItem::from(s))
        .collect();
    Ok(list_items)
}

#[tauri::command]
pub fn add_source(new_source: SourceDto) -> Result<(), String> {
    println!("[server] Checking if source exists...");

    match SourceDto::does_abbr_exist(&new_source.abbreviation) {
        true => {
            println!("[server[ Source already exists");
            Err(format!(
                "There is already a source with the abbreviation of {}",
                &new_source.abbreviation
            ))
        }
        false => {
            println!("[server] Source doesn't exist, creating...");
            SourceDto::insert(new_source);

            Ok(())
        }
    }
}
