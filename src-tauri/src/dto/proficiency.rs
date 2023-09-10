use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::proficiencies)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Proficiencies {
    id: i32,
    name: String,
}

impl Proficiencies {
    pub fn get_all() -> Vec<Proficiencies> {
        use crate::schema::proficiencies::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = proficiencies
            .load::<Proficiencies>(conn)
            .expect("Error loading proficiencies");

        results
    }
}
