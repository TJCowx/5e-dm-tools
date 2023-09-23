use serde::{Deserialize, Serialize};

use crate::dto::{
    action_type_dto::ActionTypeDto, attack_delivery_dto::AttackDeliveryDto,
    attack_type_dto::AttackTypeDto,
};

use super::creature_action_damage::{BaseCreatureActionDamage, CreatureActionDamage};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatureAction {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub attack_type_id: Option<i32>,
    pub action_type_id: i32,
    pub creature_id: i32,

    pub damages: Vec<CreatureActionDamage>,
    pub action_type: ActionTypeDto,
    pub attack_delivery: Option<AttackDeliveryDto>,
    pub attack_type: Option<AttackTypeDto>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BaseCreatureAction {
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub action_type_id: i32,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub attack_type_id: Option<i32>,
    pub damages: Option<Vec<BaseCreatureActionDamage>>,
}
