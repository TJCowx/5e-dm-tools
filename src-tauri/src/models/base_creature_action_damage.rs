use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct BaseCreatureActionDamage {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
}
