use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureActionDamage {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
}
