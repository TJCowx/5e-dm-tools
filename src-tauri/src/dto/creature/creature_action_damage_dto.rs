use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{
    dto::damage_type_dto::DamageTypeDto,
    models::creature::creature_action_damage::CreatureActionDamage,
};

#[derive(Debug, Serialize, Deserialize, Queryable, AsChangeset)]
#[diesel(table_name = crate::schema::creature_action_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(DamageType))]
#[diesel(belongs_to(CreatureAction))]
pub struct CreatureActionDamageDto {
    id: i32,
    default_damage: i32,
    dice: String,
    type_id: i32,
    action_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creature_action_damages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureActionDamageDto {
    pub default_damage: i32,
    pub dice: String,
    pub type_id: i32,
    pub action_id: i32,
}

impl CreatureActionDamageDto {
    pub fn get_full_damage(damage: Self) -> CreatureActionDamage {
        CreatureActionDamage {
            id: Some(damage.id),
            default_damage: damage.default_damage,
            dice: damage.dice.clone(),
            type_id: damage.type_id,
            damage_type: Some(DamageTypeDto::get_by_id(damage.type_id)),
        }
    }

    pub fn save_action_damages(
        conn: &mut SqliteConnection,
        damages: Vec<CreatureActionDamage>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_action_damages::dsl::*;

        for damage in damages {
            let new_damage = NewCreatureActionDamageDto {
                default_damage: damage.default_damage,
                dice: damage.dice,
                type_id: damage.type_id,
                action_id: parent_id.clone(),
            };

            diesel::insert_into(creature_action_damages)
                .values(&new_damage)
                .execute(conn)?;
        }

        Ok(())
    }

    fn update_action_damage(
        conn: &mut SqliteConnection,
        damage: CreatureActionDamage,
    ) -> QueryResult<()> {
        use crate::schema::creature_action_damages::dsl::*;

        diesel::update(creature_action_damages.filter(id.eq(damage.id.unwrap())))
            .set((
                default_damage.eq(damage.default_damage),
                dice.eq(damage.dice),
                type_id.eq(damage.type_id),
            ))
            .execute(conn)?;

        Ok(())
    }

    pub fn update_action_damages(
        conn: &mut SqliteConnection,
        damages: Option<Vec<CreatureActionDamage>>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_action_damages::dsl::*;

        // Get any Ids that do not exist in the list of damages
        let mut updating_damages: Vec<CreatureActionDamage> = vec![];
        let mut new_damages: Vec<CreatureActionDamage> = vec![];

        for damage in damages.unwrap() {
            if damage.id.is_some() {
                updating_damages.push(damage);
            } else {
                new_damages.push(damage);
            }
        }

        let ids_to_delete = creature_action_damages
            .select(id)
            .filter(
                action_id.eq(parent_id).and(
                    id.ne_all(
                        updating_damages
                            .iter()
                            .map(|damage| damage.id.unwrap())
                            .collect::<Vec<i32>>(),
                    ),
                ),
            )
            .load::<i32>(conn)?;

        // Delete the damages
        Self::delete_damages_by_id(conn, &ids_to_delete)?;

        // Update the damages that have the id set
        for damage in updating_damages {
            Self::update_action_damage(conn, damage)?;
        }

        if new_damages.len() > 0 {
            Self::save_action_damages(conn, new_damages, parent_id)?;
        }

        Ok(())
    }

    pub fn delete_damages_by_action_id(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creature_action_damages::dsl::*;

        diesel::delete(creature_action_damages.filter(action_id.eq(parent_id))).execute(conn)?;

        Ok(())
    }

    fn delete_damages_by_id(conn: &mut SqliteConnection, damage_ids: &Vec<i32>) -> QueryResult<()> {
        use crate::schema::creature_action_damages::dsl::*;

        diesel::delete(creature_action_damages.filter(id.eq_any(damage_ids))).execute(conn)?;

        Ok(())
    }

    pub fn get_damages_by_action_id(parent_id: i32) -> Vec<CreatureActionDamage> {
        use crate::schema::creature_action_damages::dsl::*;

        let conn = &mut crate::db::connect_db();

        let results = creature_action_damages
            .filter(action_id.eq(parent_id))
            .load::<CreatureActionDamageDto>(conn)
            .expect("Error loading damages");

        results.into_iter().map(Self::get_full_damage).collect()
    }
}
