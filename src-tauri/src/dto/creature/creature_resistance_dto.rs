use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::damage_type_dto::DamageTypeDto;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(DamageType))]
pub struct CreatureResistanceDto {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureResistanceDto {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureResistanceDto {
    pub fn save_creature_resistances(
        conn: &mut SqliteConnection,
        resistances: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_resistances::dsl::*;

        let mapped_resistances: Vec<NewCreatureResistanceDto> = resistances
            .iter()
            .map(|resistance_id| NewCreatureResistanceDto {
                creature_id: *parent_id,
                damage_type_id: *resistance_id,
            })
            .collect();

        diesel::insert_into(creatures_resistances)
            .values(&mapped_resistances)
            .execute(conn)
    }

    pub fn update_creature_resistances(
        conn: &mut SqliteConnection,
        new_resistances: &Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<()> {
        use crate::schema::creatures_resistances::dsl::*;

        let prev_resistance_ids =
            CreatureResistanceDto::get_resistance_ids_by_creature_id(parent_id);
        let mut to_delete: Vec<i32> = Vec::new();
        let mut to_add: Vec<i32> = Vec::new();

        for prev_resistance_id in prev_resistance_ids.iter() {
            if !new_resistances.contains(prev_resistance_id) {
                to_delete.push(*prev_resistance_id);
            }
        }

        for new_resistance_id in new_resistances.iter() {
            if !prev_resistance_ids.contains(new_resistance_id) {
                to_add.push(*new_resistance_id);
            }
        }

        diesel::delete(
            creatures_resistances.filter(
                creature_id
                    .eq(parent_id)
                    .and(damage_type_id.eq_any(to_delete)),
            ),
        )
        .execute(conn)?;

        Self::save_creature_resistances(conn, to_add, parent_id)?;

        Ok(())
    }

    pub fn delete_creature_resistances(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_resistances::dsl::*;

        diesel::delete(creatures_resistances.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_resistances_by_creature_id(creature_id: &i32) -> Vec<DamageTypeDto> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_resistances::dsl::creatures_resistances)
            .filter(crate::schema::creatures_resistances::dsl::creature_id.eq(creature_id))
            .select(damage_types::all_columns())
            .load::<DamageTypeDto>(conn)
            .expect("Error loading damage types")
    }

    pub fn get_resistance_ids_by_creature_id(parent_id: &i32) -> Vec<i32> {
        use crate::schema::creatures_resistances::dsl::*;

        let conn = &mut crate::db::connect_db();
        creatures_resistances
            .filter(creature_id.eq(parent_id))
            .select(damage_type_id)
            .load::<i32>(conn)
            .expect("Error loading damage types")
    }
}
