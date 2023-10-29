use crate::{
    dto::{
        action_type_dto::ActionTypeDto, attack_delivery_dto::AttackDeliveryDto,
        attack_type_dto::AttackTypeDto,
        creature::creature_action_damage_dto::CreatureActionDamageDto,
    },
    models::creature_action::{BaseCreatureAction, CreatureAction},
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = crate::schema::creature_actions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Creature))]
#[diesel(belongs_to(ActionType))]
#[diesel(belongs_to(AttackDelivery))]
#[diesel(belongs_to(AttackType))]
pub struct CreatureActionDto {
    id: i32,
    name: String,
    description: String,
    is_attack: bool,
    to_hit: Option<i32>,
    reach: Option<i32>,
    attack_delivery_id: Option<i32>,
    attack_type_id: Option<i32>,
    action_type_id: i32,
    creature_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_actions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureActionDto {
    pub name: String,
    pub description: String,
    pub is_attack: bool,
    pub to_hit: Option<i32>,
    pub reach: Option<i32>,
    pub attack_delivery_id: Option<i32>,
    pub attack_type_id: Option<i32>,
    pub action_type_id: i32,
    pub creature_id: i32,
}

impl CreatureActionDto {
    pub fn map_creature_action(action: Self) -> CreatureAction {
        let damages = CreatureActionDamageDto::get_damages_by_action_id(action.id);
        let delivery = if let Some(delivery_id) = action.attack_delivery_id {
            Some(AttackDeliveryDto::get_by_id(delivery_id))
        } else {
            None
        };
        let attack_type = if let Some(attack_type_id) = action.attack_type_id {
            Some(AttackTypeDto::get_by_id(attack_type_id).unwrap())
        } else {
            None
        };

        CreatureAction {
            id: action.id,
            name: action.name,
            description: action.description,
            is_attack: action.is_attack,
            to_hit: action.to_hit,
            reach: action.reach,
            attack_delivery_id: action.attack_delivery_id,
            attack_type_id: action.attack_type_id,
            action_type_id: action.action_type_id,
            creature_id: action.creature_id,
            damages,
            action_type: ActionTypeDto::get_by_id(action.action_type_id),
            attack_delivery: delivery,
            attack_type,
        }
    }

    pub fn save_actions(
        conn: &mut SqliteConnection,
        actions: Vec<BaseCreatureAction>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_actions::dsl::*;

        for action in actions {
            let new_action = NewCreatureActionDto {
                name: action.name,
                description: action.description,
                is_attack: action.is_attack,
                to_hit: action.to_hit,
                reach: action.reach,
                attack_delivery_id: action.attack_delivery_id,
                attack_type_id: action.attack_type_id,
                action_type_id: action.action_type_id,
                creature_id: parent_id.clone(),
            };

            let inserted_action: CreatureActionDto = diesel::insert_into(creature_actions)
                .values(&new_action)
                .get_result(conn)?;

            if let Some(damages) = action.damages {
                CreatureActionDamageDto::save_action_damages(conn, damages, &inserted_action.id)?;
            }
        }

        Ok(())
    }

    pub fn get_actions_by_creature_id(parent_id: &i32) -> QueryResult<Vec<CreatureAction>> {
        use crate::schema::creature_actions::dsl::*;

        let conn = &mut crate::db::connect_db();

        let actions = creature_actions
            .filter(creature_id.eq(parent_id))
            .load::<CreatureActionDto>(conn)?;

        println!("actions: {:?}", actions);

        Ok(actions.into_iter().map(Self::map_creature_action).collect())
    }
}
