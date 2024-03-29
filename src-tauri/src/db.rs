use std::{fs, path::Path};

use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn init() {
    if !db_file_exists() {
        create_db_file();
    }

    run_migrations();
}

pub fn connect_db() -> SqliteConnection {
    let db_path = get_db_path().clone();

    SqliteConnection::establish(db_path.as_str())
        .unwrap_or_else(|_| panic!("Error connecting to {}", db_path))
}

fn run_migrations() {
    let mut conn = init_connection();
    conn.run_pending_migrations(MIGRATIONS).unwrap();
}

fn init_connection() -> SqliteConnection {
    let db_path = "sqlite://".to_string() + get_db_path().as_str();

    SqliteConnection::establish(&db_path)
        .unwrap_or_else(|_| panic!("Error connecting to {}", db_path))
}

fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    if !db_file_exists() {
        fs::create_dir_all(&db_dir).unwrap();
    }

    fs::File::create(db_path).unwrap();
}

fn db_file_exists() -> bool {
    let db_path = get_db_path();

    Path::new(&db_path).exists()
}

fn get_db_path() -> String {
    let data_dir = dirs::data_dir().unwrap();

    let db_name = if cfg!(debug_assertions) {
        "db-dev.sqlite"
    } else {
        "db.sqlite"
    };

    data_dir.to_str().unwrap().to_string() + "/5e-dm-tools/" + db_name
}
