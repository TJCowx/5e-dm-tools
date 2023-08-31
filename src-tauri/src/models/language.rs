use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Language {
    id: i32,
    name: String,
}

impl Language {
    pub fn get_all() -> Vec<Language> {
        use crate::schema::languages::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = languages
            .load::<Language>(conn)
            .expect("Error loading languages");

        results
    }
}
