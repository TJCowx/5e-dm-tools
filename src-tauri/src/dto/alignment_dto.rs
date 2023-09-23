use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::alignments)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AlignmentDto {
    id: i32,
    name: String,
}

impl AlignmentDto {
    pub fn get_all() -> Vec<AlignmentDto> {
        use crate::schema::alignments::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = alignments
            .load::<AlignmentDto>(conn)
            .expect("Error loading alignments");

        results
    }

    pub fn get_by_id(alignment_id: &i32) -> AlignmentDto {
        use crate::schema::alignments::dsl::*;

        let conn = &mut crate::db::connect_db();
        alignments
            .filter(id.eq(alignment_id))
            .first::<AlignmentDto>(conn)
            .expect("Error loading alignment")
    }
}
