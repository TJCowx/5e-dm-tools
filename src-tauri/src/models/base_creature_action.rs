use serde::{Deserialize, Serialize};

use super::base_creature_action_damage::BaseCreatureActionDamage;

#[derive(Debug, Serialize, Deserialize)]
pub struct BaseCreatureAction {
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub action_type_id: i32,
    pub damages: Vec<BaseCreatureActionDamage>,
}
