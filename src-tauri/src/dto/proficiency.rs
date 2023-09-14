use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Proficiency {
    id: i32,
    name: String,
}

impl Proficiency {
    pub fn get_all() -> Vec<Proficiency> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = proficiencies
            .load::<Proficiency>(conn)
            .expect("Error loading proficiencies");

        results
    }

    pub fn get_proficiencies_by_creature_id(creature_id: &i32) -> Vec<Proficiency> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        proficiencies
            .inner_join(crate::schema::creatures_proficiencies::dsl::creatures_proficiencies)
            .filter(crate::schema::creatures_proficiencies::dsl::creature_id.eq(creature_id))
            .select(proficiencies::all_columns())
            .load::<Proficiency>(conn)
            .expect("Error loading proficiencies")
    }
}
