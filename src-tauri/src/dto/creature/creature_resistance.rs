use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::dto::damage_type::DamageType;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(CreatureDto))]
#[diesel(belongs_to(DamageType))]
pub struct CreatureResistance {
    id: i32,
    creature_id: i32,
    damage_type_id: i32,
}

#[derive(Debug, Serialize, Deserialize, Insertable)]
#[diesel(table_name = crate::schema::creatures_resistances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewCreatureResistance {
    pub creature_id: i32,
    pub damage_type_id: i32,
}

impl CreatureResistance {
    pub fn save_creature_resistances(
        conn: &mut SqliteConnection,
        resistances: Vec<i32>,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_resistances::dsl::*;

        let mapped_resistances: Vec<NewCreatureResistance> = resistances
            .iter()
            .map(|resistance_id| NewCreatureResistance {
                creature_id: *parent_id,
                damage_type_id: *resistance_id,
            })
            .collect();

        diesel::insert_into(creatures_resistances)
            .values(&mapped_resistances)
            .execute(conn)
    }

    pub fn delete_creature_resistances(
        conn: &mut SqliteConnection,
        parent_id: &i32,
    ) -> QueryResult<usize> {
        use crate::schema::creatures_resistances::dsl::*;

        diesel::delete(creatures_resistances.filter(creature_id.eq(parent_id))).execute(conn)
    }

    pub fn get_resistances_by_creature_id(creature_id: &i32) -> Vec<DamageType> {
        use crate::schema::damage_types::dsl::*;

        let conn = &mut crate::db::connect_db();
        damage_types
            .inner_join(crate::schema::creatures_resistances::dsl::creatures_resistances)
            .filter(crate::schema::creatures_resistances::dsl::creature_id.eq(creature_id))
            .select(damage_types::all_columns())
            .load::<DamageType>(conn)
            .expect("Error loading damage types")
    }
}
