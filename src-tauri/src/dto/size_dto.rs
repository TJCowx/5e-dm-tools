use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::sizes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Creature))]
pub struct SizeDto {
    id: i32,
    name: String,
}

impl SizeDto {
    pub fn get_all() -> Vec<SizeDto> {
        use crate::schema::sizes::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = sizes.load::<SizeDto>(conn).expect("Error loading sizes");

        results
    }

    pub fn get_by_id(size_id: &i32) -> SizeDto {
        use crate::schema::sizes::dsl::*;

        let conn = &mut crate::db::connect_db();
        sizes
            .filter(id.eq(size_id))
            .first::<SizeDto>(conn)
            .expect("Error loading size")
    }
}
