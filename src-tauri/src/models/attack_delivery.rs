use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::attack_deliveries)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AttackDelivery {
    id: i32,
    name: String,
}
