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
    combatants_hit: Option<i32>,
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
    pub combatants_hit: Option<i32>,
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
            id: Some(action.id),
            name: action.name,
            description: action.description,
            is_attack: action.is_attack,
            to_hit: action.to_hit,
            reach: action.reach,
            combatants_hit: action.combatants_hit,
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
        actions: Vec<CreatureAction>,
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
                combatants_hit: action.combatants_hit,
                attack_delivery_id: action.attack_delivery_id,
                attack_type_id: action.attack_type_id,
                action_type_id: action.action_type_id,
                creature_id: parent_id.clone(),
            };

            let inserted_action: CreatureActionDto = diesel::insert_into(creature_actions)
                .values(&new_action)
                .get_result(conn)?;

            if action.damages.len() > 0 {
                CreatureActionDamageDto::save_action_damages(
                    conn,
                    action.damages,
                    &inserted_action.id,
                )?;
            }
        }

        Ok(())
    }

    fn update_action(
        conn: &mut SqliteConnection,
        action: CreatureAction,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_actions::dsl::*;

        // Update the damages in the action
        CreatureActionDamageDto::update_action_damages(conn, Some(action.damages), parent_id)?;

        // Update the action itself
        diesel::update(creature_actions.filter(id.eq(action.id.unwrap())))
            .set((
                name.eq(&action.name),
                description.eq(&action.description),
                is_attack.eq(&action.is_attack),
                to_hit.eq(&action.to_hit),
                reach.eq(&action.reach),
                combatants_hit.eq(&action.combatants_hit),
                attack_delivery_id.eq(&action.attack_delivery_id),
                attack_type_id.eq(&action.attack_type_id),
                action_type_id.eq(&action.action_type_id),
            ))
            .execute(conn)?;

        Ok(())
    }

    fn delete_action(conn: &mut SqliteConnection, action_id: &i32) -> QueryResult<()> {
        use crate::schema::creature_actions::dsl::*;

        CreatureActionDamageDto::delete_damages_by_action_id(conn, &action_id)?;

        diesel::delete(creature_actions.filter(id.eq(action_id))).execute(conn)?;

        Ok(())
    }

    pub fn update_actions(
        conn: &mut SqliteConnection,
        actions: &Vec<CreatureAction>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_actions::dsl::*;

        let mut updating_actions: Vec<CreatureAction> = vec![];
        let mut new_actions: Vec<CreatureAction> = vec![];

        for action in actions {
            if action.id.is_some() {
                updating_actions.push(action.clone());
            } else {
                new_actions.push(action.clone());
            }
        }

        // Get id of actions that are in the database but not in the list of existing ids
        let ids_to_delete = creature_actions
            .select(id)
            .filter(
                creature_id
                    .eq(parent_id)
                    .and(id.ne_all(updating_actions.iter().map(|a| a.id.unwrap()))),
            )
            .load::<i32>(conn)?;

        // if there is delete them
        if ids_to_delete.len() > 0 {
            // Loop through Ids and delete them
            for to_del_id in ids_to_delete {
                Self::delete_action(conn, &to_del_id)?;
            }
        }

        // Update any actions that already exist
        for action in updating_actions {
            Self::update_action(conn, action, parent_id)?;
        }

        // Insert any new actions
        Self::save_actions(conn, new_actions, parent_id)?;

        Ok(())
    }

    pub fn get_actions_by_creature_id(parent_id: &i32) -> QueryResult<Vec<CreatureAction>> {
        use crate::schema::creature_actions::dsl::*;

        let conn = &mut crate::db::connect_db();

        let actions = creature_actions
            .filter(creature_id.eq(parent_id))
            .load::<CreatureActionDto>(conn)?;

        Ok(actions.into_iter().map(Self::map_creature_action).collect())
    }
}
