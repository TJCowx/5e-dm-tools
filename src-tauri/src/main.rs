#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use log::LevelFilter;
use tauri_plugin_log::LogTarget;

mod db;
pub mod dto;
pub mod models;
mod queries;
pub mod schema;

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout])
                .level(LevelFilter::Error)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            queries::action_type::get_all_action_types,
            queries::action_type::get_action_type_by_id,
            queries::alignment::get_all_alignments,
            queries::attack_delivery::get_all_attack_deliveries,
            queries::attack_delivery::get_attack_delivery_by_id,
            queries::attack_type::get_all_attack_types,
            queries::attack_type::get_attack_type_by_id,
            queries::condition_type::get_all_condition_types,
            queries::creature::get_all_creatures,
            queries::creature::get_creature_by_id,
            queries::creature::get_editable_creature_by_id,
            queries::creature::add_creature,
            queries::creature::update_creature,
            queries::creature::delete_creature,
            queries::creature_type::get_all_creature_types,
            queries::damage_type::get_all_damage_types,
            queries::damage_type::get_damage_type_by_id,
            queries::damage_type::get_damage_types_by_ids,
            queries::environment::get_all_environments,
            queries::export::export_creature,
            queries::export::export_creatures,
            queries::export::export_source,
            queries::import::import_creature,
            queries::import::import_creatures,
            queries::import::import_source,
            queries::language::get_all_languages,
            queries::proficiency::get_all_proficiencies,
            queries::size::get_all_sizes,
            queries::source::add_source,
            queries::source::get_all_sources,
            queries::source::get_sources_list,
            queries::source::edit_source,
            queries::source::remove_source
        ])
        .setup(|_app| {
            db::init();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
