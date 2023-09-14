use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::alignments)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Alignment {
    id: i32,
    name: String,
}

impl Alignment {
    pub fn get_all() -> Vec<Alignment> {
        use crate::schema::alignments::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = alignments
            .load::<Alignment>(conn)
            .expect("Error loading alignments");

        results
    }

    pub fn get_by_id(alignment_id: &i32) -> Alignment {
        use crate::schema::alignments::dsl::*;

        let conn = &mut crate::db::connect_db();
        alignments
            .filter(id.eq(alignment_id))
            .first::<Alignment>(conn)
            .expect("Error loading alignment")
    }
}
