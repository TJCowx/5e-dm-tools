use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, Queryable)]
#[diesel(table_name = crate::schema::attack_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AttackTypeDto {
    id: i32,
    name: String,
}

impl AttackTypeDto {
    pub fn get_all() -> Result<Vec<AttackTypeDto>, String> {
        use crate::schema::attack_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match attack_types.load::<AttackTypeDto>(conn) {
            Ok(results) => Ok(results),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn get_by_id(type_id: i32) -> Result<AttackTypeDto, String> {
        use crate::schema::attack_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        match attack_types
            .filter(id.eq(type_id))
            .first::<AttackTypeDto>(conn)
        {
            Ok(result) => Ok(result),
            Err(e) => Err(e.to_string()),
        }
    }
}
