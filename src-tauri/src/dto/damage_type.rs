use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::damage_types)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Damage))]
pub struct DamageType {
    id: i32,
    name: String,
}

impl DamageType {
    pub fn get_all() -> Vec<DamageType> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = damage_types
            .load::<DamageType>(conn)
            .expect("Error loading damage types");

        results
    }

    pub fn get_by_id(type_id: i32) -> DamageType {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        let result = damage_types
            .filter(id.eq(type_id))
            .first::<DamageType>(conn)
            .expect("Error loading damage type");

        result
    }

    pub fn get_by_ids(ids: Vec<i32>) -> Result<Vec<DamageType>, String> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();

        match damage_types.filter(id.eq_any(ids)).load::<DamageType>(conn) {
            Ok(results) => Ok(results),
            Err(e) => Err(e.to_string()),
        }
    }
}
