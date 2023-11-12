use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::damage_type_dto::DamageTypeDto;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(DamageType))]
pub struct CreatureWeaknessDto {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_weaknesses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureWeaknessDto {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureWeaknessDto {
    pub fn save_creature_weaknesses(
        conn: &mut SqliteConnection,
        weaknesses: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_weaknesses::dsl::*;

        let mapped_weaknesses: Vec<NewCreatureWeaknessDto> = weaknesses
            .iter()
            .map(|weakness_id| NewCreatureWeaknessDto {
                creature_id: *parent_id,
                damage_type_id: *weakness_id,
            })
            .collect();

        diesel::insert_into(creatures_weaknesses)
            .values(&mapped_weaknesses)
            .execute(conn)
    }

    pub fn update_creature_weaknesses(
        conn: &mut SqliteConnection,
        new_weaknesses: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creatures_weaknesses::dsl::*;

        let prev_weakness_ids = CreatureWeaknessDto::get_weakness_ids_by_creature_id(parent_id);
        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for prev_weakness_id in prev_weakness_ids.iter() {
            if !new_weaknesses.contains(prev_weakness_id) {
                to_delete.push(*prev_weakness_id);
            }
        }

        for new_weakness_id in new_weaknesses.iter() {
            if !prev_weakness_ids.contains(new_weakness_id) {
                to_add.push(*new_weakness_id);
            }
        }

        diesel::delete(
            creatures_weaknesses.filter(
                creature_id
                    .eq(parent_id)
                    .and(damage_type_id.eq_any(to_delete)),
            ),
        )
        .execute(conn)?;

        Self::save_creature_weaknesses(conn, to_add, parent_id)?;

        Ok(())
    }

    pub fn delete_creature_weaknesses(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_weaknesses::dsl::*;

        diesel::delete(creatures_weaknesses.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_weaknesses_by_creature_id(creature_id: &i32) -> Vec<DamageTypeDto> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_weaknesses::dsl::creatures_weaknesses)
            .filter(crate::schema::creatures_weaknesses::dsl::creature_id.eq(creature_id))
            .select(damage_types::all_columns())
            .load::<DamageTypeDto>(conn)
            .expect("Error loading damage types")
    }

    pub fn get_weakness_ids_by_creature_id(creature_id: &i32) -> Vec<i32> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_weaknesses::dsl::creatures_weaknesses)
            .filter(crate::schema::creatures_weaknesses::dsl::creature_id.eq(creature_id))
            .select(id)
            .load::<i32>(conn)
            .expect("Error loading damage types")
    }
}
