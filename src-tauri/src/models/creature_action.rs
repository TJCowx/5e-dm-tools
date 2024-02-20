use serde::{Deserialize, Serialize};

use crate::dto::{
    action_type_dto::ActionTypeDto, attack_delivery_dto::AttackDeliveryDto,
    attack_type_dto::AttackTypeDto,
};

use super::creature_action_damage::{BaseCreatureActionDamage, CreatureActionDamage};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CreatureAction {
    pub id: Option<i32>,
    pub name: String,
    pub description: Option<String>,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub combatants_hit: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub attack_type_id: Option<i32>,
    pub action_type_id: i32,
    pub creature_id: Option<i32>,

    pub damages: Vec<CreatureActionDamage>,
    pub action_type: Option<ActionTypeDto>,
    pub attack_delivery: Option<AttackDeliveryDto>,
    pub attack_type: Option<AttackTypeDto>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureAction {
    pub id: Option<i32>,
    pub name: String,
    pub description: Option<String>,
    pub is_attack: bool,
    pub action_type_id: i32,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub combatants_hit: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub attack_type_id: Option<i32>,
    pub creature_id: Option<i32>,

    pub damages: Option<Vec<BaseCreatureActionDamage>>,
    pub action_type: Option<ActionTypeDto>,
    pub attack_delivery: Option<AttackDeliveryDto>,
    pub attack_type: Option<AttackTypeDto>,
}
