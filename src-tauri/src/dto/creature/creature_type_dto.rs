use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::creature_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CreatureTypeDto {
    id: i32,
    name: String,
}

impl CreatureTypeDto {
    pub fn get_all() -> Vec<CreatureTypeDto> {
        use crate::schema::creature_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = creature_types
            .order(name.asc())
            .load::<CreatureTypeDto>(conn)
            .expect("Error loading creature types");

        results
    }

    pub fn get_by_id(type_id: &i32) -> CreatureTypeDto {
        use crate::schema::creature_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        creature_types
            .filter(id.eq(type_id))
            .first::<CreatureTypeDto>(conn)
            .expect("Error loading creature type")
    }
}
