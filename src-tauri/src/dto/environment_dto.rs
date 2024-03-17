use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::environments)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct EnvironmentDto {
    pub id: i32,
    pub name: String,
}

impl EnvironmentDto {
    pub fn get_all() -> Vec<EnvironmentDto> {
        use crate::schema::environments::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = environments
            .order(name.asc())
            .load::<EnvironmentDto>(conn)
            .expect("Error loading environments");

        return results;
    }
}
