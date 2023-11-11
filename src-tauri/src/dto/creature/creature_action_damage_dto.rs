use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{
    dto::damage_type_dto::{self, DamageTypeDto},
    models::creature_action_damage::{BaseCreatureActionDamage, CreatureActionDamage},
};

#[derive(Debug, Serialize, Deserialize, Queryable)]
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
            id: damage.id,
            default_damage: damage.default_damage,
            dice: damage.dice.clone(),
            type_id: damage.type_id,
            damage_type: DamageTypeDto::get_by_id(damage.type_id),
        }
    }

    pub fn save_action_damages(
        conn: &mut SqliteConnection,
        damages: Vec<BaseCreatureActionDamage>,
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
