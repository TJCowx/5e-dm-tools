use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::attack_deliveries)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AttackDeliveryDto {
    id: i32,
    name: String,
}

impl AttackDeliveryDto {
    pub fn get_all() -> Vec<AttackDeliveryDto> {
        use crate::schema::attack_deliveries::dsl::*;

        let conn = &mut crate::db::connect_db();
        let results = attack_deliveries
            .load::<AttackDeliveryDto>(conn)
            .expect("Error loading attack deliveries");

        results
    }

    pub fn get_by_id(delivery_id: i32) -> AttackDeliveryDto {
        use crate::schema::attack_deliveries::dsl::*;

        let conn = &mut crate::db::connect_db();
        let result = attack_deliveries
            .filter(id.eq(delivery_id))
            .first::<AttackDeliveryDto>(conn)
            .expect("Error loading attack delivery");

        result
    }
}
