use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::aoe_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AoeTypeDto {
    pub id: i32,
    pub name: String,
}

impl AoeTypeDto {
    pub fn get_all() -> Result<Vec<AoeTypeDto>, String> {
        use crate::schema::aoe_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match aoe_types.order(name.asc()).load::<AoeTypeDto>(conn) {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(aoe_type_id: &i32) -> Result<AoeTypeDto, String> {
        use crate::schema::aoe_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match aoe_types
            .filter(id.eq(aoe_type_id))
            .first::<AoeTypeDto>(conn)
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e.to_string()),
        }
    }
}
