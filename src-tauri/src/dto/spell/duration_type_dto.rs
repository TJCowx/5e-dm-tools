use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::duration_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[serde(rename_all = "camelCase")]
pub struct DurationTypeDto {
    pub id: i32,
    pub name: String,
    pub has_time_scale: bool,
}

impl DurationTypeDto {
    pub fn get_all() -> Result<Vec<DurationTypeDto>, String> {
        use crate::schema::duration_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match duration_types
            .order(name.asc())
            .load::<DurationTypeDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(duration_type_id: &i32) -> Result<DurationTypeDto, String> {
        use crate::schema::duration_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match duration_types
            .filter(id.eq(duration_type_id))
            .first::<DurationTypeDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
