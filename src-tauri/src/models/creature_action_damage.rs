use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creature_action_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(DamageType))]
#[diesel(belongs_to(CreatureAction))]
pub struct CreatureActionDamage {
    id: i32,
    default_damage: String,
    dice: String,
    type_id: i32,
    action_id: i32,
}
