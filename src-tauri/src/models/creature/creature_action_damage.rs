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
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
}

impl From<CreatureActionDamage> for BaseCreatureActionDamage {
    fn from(d: CreatureActionDamage) -> Self {
        Self {
            default_damage: d.default_damage,
            dice: d.dice,
            type_id: d.type_id,
        }
    }
}
