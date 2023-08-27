use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureProfs {
    id: i32,
    creature_id: i32,
    proficiency_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureProf {
    pub creature_id: i32,
    pub proficiency_id: i32,
}
