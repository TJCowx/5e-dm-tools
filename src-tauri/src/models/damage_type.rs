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
}
