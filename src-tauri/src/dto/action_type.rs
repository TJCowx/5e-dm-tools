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
    pub fn get_all(has_legendary: bool, has_lair: bool) -> Vec<ActionType> {
        use crate::schema::action_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let mut query = action_types.into_boxed();

        if !has_legendary {
            query = query.filter(crate::schema::action_types::name.ne("Legendary"));
        }

        if !has_lair {
            query = query.filter(crate::schema::action_types::name.ne("Lair"));
        }

        let results = query
            .load::<ActionType>(conn)
            .expect("Error loading action types");

        results
    }
}
