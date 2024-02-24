use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::languages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct LanguageDto {
    id: i32,
    name: String,
}

impl LanguageDto {
    pub fn get_all() -> Vec<LanguageDto> {
        use crate::schema::languages::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = languages
            .order(name.asc())
            .load::<LanguageDto>(conn)
            .expect("Error loading languages");

        results
    }
}
