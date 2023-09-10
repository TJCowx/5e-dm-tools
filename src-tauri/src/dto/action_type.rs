use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::action_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ActionType {
    id: i32,
    name: String,
}

impl ActionType {
    pub fn get_all() -> Vec<ActionType> {
        use crate::schema::action_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = action_types
            .load::<ActionType>(conn)
            .expect("Error loading action types");

        results
    }
}
