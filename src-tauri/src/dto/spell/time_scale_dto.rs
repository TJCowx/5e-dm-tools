use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::time_scales)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct TimeScaleDto {
    pub id: i32,
    pub name: String,
}

impl TimeScaleDto {
    pub fn get_all() -> Result<Vec<TimeScaleDto>, String> {
        use crate::schema::time_scales::dsl::*;

        let conn = &mut crate::db::connect_db();
        match time_scales.order(name.asc()).load::<TimeScaleDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(time_scale_id: &i32) -> Result<TimeScaleDto, String> {
        use crate::schema::time_scales::dsl::*;

        let conn = &mut crate::db::connect_db();
        match time_scales
            .filter(id.eq(time_scale_id))
            .first::<TimeScaleDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
