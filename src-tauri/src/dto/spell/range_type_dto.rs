use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::range_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[serde(rename_all = "camelCase")]
pub struct RangeTypeDto {
    pub id: i32,
    pub name: String,
    pub has_defined_range: bool,
}

impl RangeTypeDto {
    pub fn get_all() -> Result<Vec<RangeTypeDto>, String> {
        use crate::schema::range_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match range_types.order(name.asc()).load::<RangeTypeDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(range_type_id: &i32) -> Result<RangeTypeDto, String> {
        use crate::schema::range_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match range_types
            .filter(id.eq(range_type_id))
            .first::<RangeTypeDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
