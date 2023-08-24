#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
pub mod models;
mod queries;
pub mod schema;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            queries::creature::get_all_creatures
        ])
        .setup(|_app| {
            db::init();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
