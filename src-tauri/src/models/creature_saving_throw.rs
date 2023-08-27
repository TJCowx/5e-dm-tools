use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_saving_throws)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureSavingThrow {
    id: i32,
    creature_id: i32,
    saving_throw_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_saving_throws)]
pub struct NewCreatureSavingThrow {
    pub creature_id: i32,
    pub saving_throw_id: i32,
}
