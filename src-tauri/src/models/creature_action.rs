use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::creature_action_damage::NewCreatureActionDamage;

use super::creature_action_damage::CreatureActionDamageIn;

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creature_actions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Creature))]
#[diesel(belongs_to(ActionType))]
#[diesel(belongs_to(AttackDelivery))]
pub struct CreatureAction {
    id: i32,
    name: String,
    description: String,
    is_attack: bool,
    to_hit: Option<i32>,
    reach: Option<i32>,
    attack_delivery_id: Option<i32>,
    action_type_id: i32,
    creature_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_actions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureAction {
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub action_type_id: i32,
    pub creature_id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatureActionIn {
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub action_type_id: i32,
    pub damages: Vec<CreatureActionDamageIn>,
}

impl CreatureAction {
    pub fn save_actions(
        conn: &mut SqliteConnection,
        actions: Vec<CreatureActionIn>,
        parent_id: &i32,
    ) {
        use crate::schema::creature_actions::dsl::*;

        for action in actions {
            let new_action = NewCreatureAction {
                name: action.name,
                description: action.description,
                is_attack: action.is_attack,
                to_hit: action.to_hit,
                reach: action.reach,
                attack_delivery_id: action.attack_delivery_id,
                action_type_id: action.action_type_id,
                creature_id: parent_id.clone(),
            };

            let inserted_action: CreatureAction = diesel::insert_into(creature_actions)
                .values(&new_action)
                .get_result(conn)
                .unwrap();

            let mapped_damages: Vec<NewCreatureActionDamage> = action
                .damages
                .into_iter()
                .map(|damage| NewCreatureActionDamage {
                    default_damage: damage.default_damage,
                    dice: damage.dice,
                    type_id: damage.type_id,
                    action_id: inserted_action.id,
                })
                .collect();

            diesel::insert_into(crate::schema::creature_action_damages::table)
                .values(&mapped_damages)
                .execute(conn);
        }
    }
}
