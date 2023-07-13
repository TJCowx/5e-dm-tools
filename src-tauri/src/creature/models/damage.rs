use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Damage {
    id: String,
    damage: String,
    damage_dice: String,
    damage_type: String,
}
