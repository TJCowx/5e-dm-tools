use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::action_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ActionTypeDto {
    id: i32,
    name: String,
}

impl ActionTypeDto {
    pub fn get_all(has_legendary: bool, has_lair: bool) -> Vec<ActionTypeDto> {
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
            .load::<ActionTypeDto>(conn)
            .expect("Error loading action types");

        results
    }

    pub fn get_by_id(type_id: i32) -> ActionTypeDto {
        use crate::schema::action_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let result = action_types
            .filter(id.eq(type_id))
            .first::<ActionTypeDto>(conn)
            .expect("Error loading action type");

        result
    }
}
