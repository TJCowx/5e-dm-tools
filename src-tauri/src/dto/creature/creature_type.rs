use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::creature_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureType {
    id: i32,
    name: String,
}

impl CreatureType {
    pub fn get_all() -> Vec<CreatureType> {
        use crate::schema::creature_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = creature_types
            .load::<CreatureType>(conn)
            .expect("Error loading creature types");

        results
    }

    pub fn get_by_id(type_id: &i32) -> CreatureType {
        use crate::schema::creature_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        creature_types
            .filter(id.eq(type_id))
            .first::<CreatureType>(conn)
            .expect("Error loading creature type")
    }
}
