use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureCondImmunity {
    id: i32,
    creature_id: i32,
    condition_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureCondImmunity {
    pub creature_id: i32,
    pub condition_type_id: i32,
}
