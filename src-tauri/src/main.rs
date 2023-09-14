#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
pub mod dto;
pub mod models;
mod queries;
pub mod schema;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            queries::creature::get_all_creatures,
            queries::creature::add_creature,
            queries::creature::delete_creature,
            queries::alignment::get_all_alignments,
            queries::attack_delivery::get_all_attack_deliveries,
            queries::action_type::get_all_action_types,
            queries::condition_type::get_all_condition_types,
            queries::creature_type::get_all_creature_types,
            queries::damage_type::get_all_damage_types,
            queries::language::get_all_languages,
            queries::size::get_all_sizes,
            queries::proficiency::get_all_proficiencies,
        ])
        .setup(|_app| {
            db::init();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
