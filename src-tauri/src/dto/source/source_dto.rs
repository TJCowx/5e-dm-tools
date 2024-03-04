use diesel::{dsl::exists, prelude::*, select};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize, Insertable, Queryable, AsChangeset)]
#[diesel(table_name = crate::schema::sources)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct SourceDto {
    pub abbreviation: String,
    pub name: String,
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

    pub fn does_abbr_exist(abbr: &String) -> bool {
        use crate::schema::sources::dsl::*;

        let conn = &mut crate::db::connect_db();

        select(exists(sources.filter(abbreviation.eq(abbr))))
            .get_result::<bool>(conn)
            .expect("Error getting id")
    }

    pub fn insert(source: SourceDto) -> usize {
        use crate::schema::sources::dsl::*;

        let conn = &mut crate::db::connect_db();

        diesel::insert_into(sources)
            .values(source)
            .execute(conn)
            .expect("Error saving source")
    }

    pub fn update(source: SourceDto) -> Result<usize, diesel::result::Error> {
        use crate::schema::sources::dsl::*;

        let conn = &mut crate::db::connect_db();

        diesel::update(sources.find(source.abbreviation.clone()))
            .set(source)
            .execute(conn)
    }
}
