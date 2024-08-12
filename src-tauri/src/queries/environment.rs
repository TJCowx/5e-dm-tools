use crate::dto::environment_dto::EnvironmentDto;
use log::info;

#[tauri::command]
pub fn get_all_environments() -> Result<Vec<EnvironmentDto>, String> {
    info!("Getting all environments");
    let envs = EnvironmentDto::get_all();

    info!("Retrieved {} environments", envs.len());

    Ok(envs)
}
