use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creature_action_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(DamageType))]
#[diesel(belongs_to(CreatureAction))]
pub struct CreatureActionDamageDto {
    id: i32,
    default_damage: String,
    dice: String,
    type_id: i32,
    action_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_action_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureActionDamageDto {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
    pub action_id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatureActionDamageIn {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
}
