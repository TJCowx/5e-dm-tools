use crate::dto::environment_dto::EnvironmentDto;

#[tauri::command]
pub fn get_all_environments() -> Result<Vec<EnvironmentDto>, String> {
    println!("[server] Getting all environments");
    let envs = EnvironmentDto::get_all();

    println!("[server] Retrieved {} environments", envs.len());

    Ok(envs)
}
