use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::condition_type_dto::ConditionTypeDto;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(ConditionType))]
pub struct CreatureCondImmunityDto {
    id: i32,
    creature_id: i32,
    condition_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_condition_immunities)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureCondImmunityDto {
    pub creature_id: i32,
    pub condition_type_id: i32,
}

impl CreatureCondImmunityDto {
    pub fn save_creature_cond_immunities(
        conn: &mut SqliteConnection,
        cond_immunities: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_condition_immunities::dsl::*;

        let mapped_cond_immunities: Vec<NewCreatureCondImmunityDto> = cond_immunities
            .iter()
            .map(|cond_immunity_id| NewCreatureCondImmunityDto {
                creature_id: *parent_id,
                condition_type_id: *cond_immunity_id,
            })
            .collect();

        diesel::insert_into(creatures_condition_immunities)
            .values(&mapped_cond_immunities)
            .execute(conn)
    }

    pub fn update_creature_cond_immunities(
        conn: &mut SqliteConnection,
        new_cond_immunities: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creatures_condition_immunities::dsl::*;

        let prev_cond_immunity_ids =
            CreatureCondImmunityDto::get_cond_ids_by_creature_id(parent_id);
        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for prev_cond_immunity_id in prev_cond_immunity_ids.iter() {
            if !new_cond_immunities.contains(prev_cond_immunity_id) {
                to_delete.push(*prev_cond_immunity_id);
            }
        }

        for new_cond_immunity_id in new_cond_immunities.iter() {
            if !prev_cond_immunity_ids.contains(new_cond_immunity_id) {
                to_add.push(*new_cond_immunity_id);
            }
        }

        diesel::delete(
            creatures_condition_immunities.filter(
                creature_id
                    .eq(parent_id)
                    .and(condition_type_id.eq_any(to_delete)),
            ),
        )
        .execute(conn)?;

        Self::save_creature_cond_immunities(conn, to_add, parent_id)?;

        Ok(())
    }

    pub fn delete_creature_cond_immunities(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_condition_immunities::dsl::*;

        diesel::delete(creatures_condition_immunities.filter(creature_id.eq(parent_id)))
            .execute(conn)
    }

    pub fn get_conditions_by_creature_id(creature_id: &i32) -> Vec<ConditionTypeDto> {
        use crate::schema::condition_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        condition_types
            .inner_join(
                crate::schema::creatures_condition_immunities::dsl::creatures_condition_immunities,
            )
            .filter(crate::schema::creatures_condition_immunities::dsl::creature_id.eq(creature_id))
            .select(condition_types::all_columns())
            .load::<ConditionTypeDto>(conn)
            .expect("Error loading condition types")
    }

    pub fn get_cond_ids_by_creature_id(creature_id: &i32) -> Vec<i32> {
        use crate::schema::condition_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        condition_types
            .inner_join(
                crate::schema::creatures_condition_immunities::dsl::creatures_condition_immunities,
            )
            .filter(crate::schema::creatures_condition_immunities::dsl::creature_id.eq(creature_id))
            .select(id)
            .load::<i32>(conn)
            .expect("Error loading condition types")
    }
}
