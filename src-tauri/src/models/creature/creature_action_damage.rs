use serde::{Deserialize, Serialize};

use crate::dto::damage_type_dto::DamageTypeDto;

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CreatureActionDamage {
    pub id: Option<i32>,
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,

    pub damage_type: Option<DamageTypeDto>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureActionDamage {
    pub id: Option<i32>,
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
}
