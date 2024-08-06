use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::cast_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct CastTypeDto {
    pub id: i32,
    pub name: String,
}

impl CastTypeDto {
    pub fn get_all() -> Result<Vec<CastTypeDto>, String> {
        use crate::schema::cast_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match cast_types.order(name.asc()).load::<CastTypeDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(cast_type_id: &i32) -> Result<CastTypeDto, String> {
        use crate::schema::cast_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match cast_types
            .filter(id.eq(cast_type_id))
            .first::<CastTypeDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
