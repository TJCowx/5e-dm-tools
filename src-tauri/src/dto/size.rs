use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::sizes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Creature))]
pub struct Size {
    id: i32,
    name: String,
}

impl Size {
    pub fn get_all() -> Vec<Size> {
        use crate::schema::sizes::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = sizes.load::<Size>(conn).expect("Error loading sizes");

        results
    }
}
