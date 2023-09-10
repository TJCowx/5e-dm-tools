use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::condition_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ConditionType {
    id: i32,
    name: String,
}

impl ConditionType {
    pub fn get_all() -> Vec<ConditionType> {
        use crate::schema::condition_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = condition_types
            .load::<ConditionType>(conn)
            .expect("Error loading condition types");

        results
    }
}
