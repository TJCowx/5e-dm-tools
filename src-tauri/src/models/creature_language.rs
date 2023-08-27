use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureLanguage {
    id: i32,
    creature_id: i32,
    language_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureLanguage {
    pub creature_id: i32,
    pub language_id: i32,
}
