use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::alignments)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Alignment {
    id: i32,
    name: String,
}
