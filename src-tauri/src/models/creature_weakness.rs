use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureWeakness {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureWeakness {
    pub creature_id: i32,
    pub damage_type_id: i32,
}
