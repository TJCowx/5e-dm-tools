use crate::models::damage::Damage;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Action {
    name: String,
    description: String,
    action_type: String,
    is_attack: bool,
    attack_delivery: Option<String>,
    to_hit: Option<i16>,
    damage: Option<Vec<Damage>>,
    reach: Option<i16>,
}
