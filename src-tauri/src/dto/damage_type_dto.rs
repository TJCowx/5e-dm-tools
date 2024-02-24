use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone, Queryable)]
#[diesel(table_name = crate::schema::damage_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Damage))]
pub struct DamageTypeDto {
    pub id: i32,
    pub name: String,
}

impl DamageTypeDto {
    pub fn get_all() -> Vec<DamageTypeDto> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = damage_types
            .order(name.asc())
            .load::<DamageTypeDto>(conn)
            .expect("Error loading damage types");

        results
    }

    pub fn get_by_id(type_id: i32) -> DamageTypeDto {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let result = damage_types
            .filter(id.eq(type_id))
            .first::<DamageTypeDto>(conn)
            .expect("Error loading damage type");

        result
    }

    pub fn get_by_ids(ids: Vec<i32>) -> Result<Vec<DamageTypeDto>, String> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();

        match damage_types
            .filter(id.eq_any(ids))
            .load::<DamageTypeDto>(conn)
        {
            Ok(results) => Ok(results),
            Err(e) => Err(e.to_string()),
        }
    }
}
