use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creature_actions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Creature))]
#[diesel(belongs_to(ActionType))]
#[diesel(belongs_to(AttackDelivery))]
pub struct CreatureAction {
    id: i32,
    name: String,
    description: String,
    is_attack: bool,
    to_hit: Option<i8>,
    reach: Option<i8>,
    attack_delivery_id: Option<i32>,
    action_type_id: Option<i32>,
    creature_id: Option<i32>,
}
