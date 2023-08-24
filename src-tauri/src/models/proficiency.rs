use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Proficiencies {
    id: i32,
    name: String,
}
