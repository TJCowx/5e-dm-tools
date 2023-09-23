use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::condition_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct ConditionTypeDto {
    id: i32,
    name: String,
}

impl ConditionTypeDto {
    pub fn get_all() -> Vec<ConditionTypeDto> {
        use crate::schema::condition_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = condition_types
            .load::<ConditionTypeDto>(conn)
            .expect("Error loading condition types");

        results
    }
}
