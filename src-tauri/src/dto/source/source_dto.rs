use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::alignments)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct SourceDto {
    abbreviation: String,
    name: String,
}

impl SourceDto {
    pub fn get_all() -> Vec<SourceDto> {
        use crate::schema::sources::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = sources
            .load::<SourceDto>(conn)
            .expect("Error loading sources");

        results
    }

    pub fn get_by_id(source_abbr: &String) -> Self {
        use crate::schema::sources::dsl::*;

        let conn = &mut crate::db::connect_db();
        sources
            .filter(abbreviation.eq(source_abbr))
            .first::<SourceDto>(conn)
            .expect("Error loading source")
    }
}
