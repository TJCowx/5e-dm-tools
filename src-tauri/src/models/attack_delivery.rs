use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::attack_deliveries)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AttackDelivery {
    id: i32,
    name: String,
}

impl AttackDelivery {
    pub fn get_all() -> Vec<AttackDelivery> {
        use crate::schema::attack_deliveries::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = attack_deliveries
            .load::<AttackDelivery>(conn)
            .expect("Error loading attack deliveries");

        results
    }
}
