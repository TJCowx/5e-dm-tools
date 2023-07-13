use lazy_static::lazy_static;

use mongodb::{
    options::{ClientOptions, ResolverConfig},
    Client,
};
use std::sync::Mutex;

lazy_static! {
    static ref CONNECTION_POOL: Mutex<Vec<Client>> = Mutex::new(Vec::new());
}

#[tauri::command(rename_all = "snake_case")]
pub async fn connect_db(conn_str: &str) -> Result<(), String> {
    println!("[server] Connecting to database...");

    let options =
        ClientOptions::parse_with_resolver_config(&conn_str, ResolverConfig::cloudflare())
            .await
            .map_err(|err| err.to_string())?;

    // TODO: Probably just make a pool of a few of these tbh
    let client = Client::with_options(options).map_err(|err| err.to_string())?;
    push_connection(client);

    println!("[server] Successfully connected to database.");

    Ok(())
}

pub fn push_connection(client: Client) {
    CONNECTION_POOL.lock().unwrap().push(client);
}

pub fn get_connection() -> Client {
    let mut pool = CONNECTION_POOL.lock().unwrap();

    if let Some(connection) = pool.pop() {
        connection
    } else {
        let client_options = ClientOptions::builder()
            .hosts(vec![mongodb::options::ServerAddress::Tcp {
                host: "localhost".to_string(),
                port: Some(27017),
            }])
            .build();

        Client::with_options(client_options).unwrap()
    }
}
